import fs from "fs";
import { parseStringPromise } from "xml2js";
import { parse as parseHTML } from "node-html-parser";
import { Surreal } from "surrealdb.js";
import { cwd } from "process";

export async function onSuccess() {
    // const isLocalBuild = process.env.DEPLOY_URL == 'https://0--surrealdb-docs.netlify.app';
    const applyIndexes = process.env.DEPLOY_PRIME_URL == 'https://main--surrealdb-docs.netlify.app';
    const jobDate = new Date();
    const db = new Surreal({
        onConnect: () => console.log("[DB] Connected to SurrealDB"),
        onClose: () => console.log("[DB] Disconnected from SurrealDB"),
        onError: () => console.log("[DB] Error occurred"),
    });

    if (applyIndexes) await db.connect(process.env.SURREAL_ENDPOINT, {
        namespace: process.env.SURREAL_NAMESPACE,
        database: process.env.SURREAL_DATABASE,
        auth: {
            namespace: process.env.SURREAL_NAMESPACE,
            database: process.env.SURREAL_DATABASE,
            username: process.env.SURREAL_USERNAME,
            password: process.env.SURREAL_PASSWORD,
        }
    });

    const buildDir = `${cwd()}/build/`;
    const deployUrl = new URL(process.env.DEPLOY_PRIME_URL);
    const hostname = deployUrl.hostname;
    const sitemapPath = buildDir + "docs/sitemap.xml";
    console.log(`[CW] Build dir is: "${buildDir}"`);
    console.log(`[CW] Deploy URL is: "${deployUrl}"`);
    console.log(`[CW] Sitemap path is: "${sitemapPath}"`);

    const sitemapXml = fs.readFileSync(sitemapPath, "utf8");
    const sitemap = await parseStringPromise(sitemapXml);
    const urls = sitemap.urlset.url;
    console.log(`[CW] The sitemap contains ${urls.length} url(s)`);

    const pathnames = urls.map((url) => {
        let pathname = decodeURI(new URL(url.loc[0]).pathname);
        if (pathname.endsWith('/')) pathname = pathname.slice(0, -1);
        return pathname;
    });
    const chunkSize = 1;

    for (let i = 0; i < pathnames.length; i += chunkSize) {
        const chunk = pathnames.slice(i, i + chunkSize);
        await Promise.all(chunk.map(async (pathname, index) => {
            index += i;
            console.log(`[CW] Crawling page ${index + 1}/${pathnames.length}: ${pathname}`);

            const filePath = `${buildDir}${pathname}/index.html`;
            const fileContent = fs.readFileSync(filePath, "utf-8").replace(/\0/g, '');
            const document = parseHTML(fileContent, {
                blockTextElements: {
                    script: true,
                    style: true,
                    noscript: true,
                }
            });

            const scrapByQuerySelector = (query, blockContent) => document.querySelectorAll(query)
                .map((el) => {
                    const block = blockContent?.(el) ?? el.textContent;
                    if (!block) return;

                    const parts = block.split(/\s+/);
                    const trimmedParts = parts.filter(Boolean); // This removes any empty strings
                    const trimmedBlock = trimmedParts.join(" ");
                    if (trimmedBlock.length > 0) return trimmedBlock;
                })
                .filter(a => a);

            const title = document.querySelector('title').textContent;
            const h1 = scrapByQuerySelector('h1');
            const h2 = scrapByQuerySelector('h2');
            const h3 = scrapByQuerySelector('h3');
            const h4 = scrapByQuerySelector('h4');
            const code = scrapByQuerySelector('code', (el) => [...el.childNodes].map(el => el.textContent).join('\n'));
            const content = [
                ...scrapByQuerySelector('p,h1,h2,h3,h4,h5,h6,tr,th,td'),
                ...code,
            ];

            if (applyIndexes && content.length > 0) {
                const start = Date.now();
                const recordId = `page:[${JSON.stringify(hostname)}, ${JSON.stringify(pathname)}]`;

                console.log(`[IX] Removing old index for "${recordId}"`);
                await db.query(/* surql */ `DELETE page:[$hostname, $pathname];`, { hostname, pathname });

                console.log(`[IX] Indexing "${recordId}"`);
                await db.query(
                    /* surql */ `
                        CREATE page:[$hostname, $path] CONTENT { 
                            title: $title, 
                            path: $path,
                            hostname: $hostname,
                            h1: $h1, 
                            h2: $h2, 
                            h3: $h3, 
                            h4: $h4, 
                            content: $content, 
                            code: $code, 
                            date: $date, 
                        };
                    `, 
                    { 
                        title, 
                        path: pathname,
                        hostname,
                        h1, h2, h3, h4, content, code, 
                        date: jobDate 
                    }
                )

                const elapsed = Date.now() - start;
                console.log(`[IX] Took ${elapsed}ms to index "${recordId}"`);
            } else {
                console.log(`[IX] Skipping indexing, not on prod`);
            }
        }));
    }

    if (applyIndexes) {
        console.log(`[CW] Removing stale pages`);
        await db.query(
            /* surql */ `
                DELETE page WHERE 
                    hostname = $hostname AND 
                    (date IS NONE OR date < $jobDate)
            `, 
            { 
                jobDate, 
                hostname: hostname 
            }
        );
    } else {
        console.log(`[CW] Skipping stale page removal, not on prod`);
    }

    console.log(`[CW] Closing connection to SurrealDB`);
    await db.close();
}