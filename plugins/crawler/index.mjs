import fs from "fs";
import { parseStringPromise } from "xml2js";
import { parse as parseHTML } from "node-html-parser";
import { Surreal } from "surrealdb.js";
import { cwd } from "process";

export async function onSuccess() {
    const isLocalBuild = process.env.DEPLOY_URL == 'https://0--surrealdb-docs.netlify.app';
    const jobDate = new Date();
    const db = new Surreal({
        onConnect: () => console.log("[DB] Connected to SurrealDB"),
        onClose: () => console.log("[DB] Disconnected from SurrealDB"),
        onError: () => console.log("[DB] Error occurred"),
    });

    if (!isLocalBuild) await db.connect(process.env.SURREAL_ENDPOINT, {
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
    const deployUrl = new URL(process.env.DEPLOY_URL);
    const sitemapPath = buildDir + "sitemap.xml";
    console.log(`[CW] Build dir is: "${buildDir}"`);
    console.log(`[CW] Deploy URL is: "${deployUrl}"`);
    console.log(`[CW] Sitemap path is: "${sitemapPath}"`);

    const sitemapXml = fs.readFileSync(sitemapPath, "utf8");
    const sitemap = await parseStringPromise(sitemapXml);
    const urls = sitemap.urlset.url;
    console.log(`[CW] The sitemap contains ${urls.length} url(s)`);

    const pathnames = urls.map((url) => new URL(url.loc[0]).pathname);
    await Promise.allSettled(pathnames.map(async (pathname, index) => {
        console.log(`[CW] Crawling page ${index + 1}/${pathnames.length}: ${pathname}`);

        const filePath = `${buildDir}${pathname}/index.html`;
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const document = parseHTML(fileContent);

        const scrapByQuerySelector = (query) => extractText(document.querySelectorAll(query).map(el => el.textContent));
        const title = document.querySelector('title').textContent;
        const h1 = scrapByQuerySelector('h1');
        const h2 = scrapByQuerySelector('h2');
        const h3 = scrapByQuerySelector('h3');
        const h4 = scrapByQuerySelector('h4');
        const code = scrapByQuerySelector('code');
        const content = scrapByQuerySelector('p,h1,h2,h3,h4,h5,h6,tr,th,td,code');

        if (!isLocalBuild && content.length > 0) {
            const recordId = `page_test:⟨${pathname}⟩`;
            console.log(`[IX] Indexing "${recordId}"`);
            await db.delete(recordId);
            const start = Date.now();
            await db.create("page_test", { id: pathname, title, path, h1, h2, h3, h4, content, code, date: jobDate });
            const elapsed = Date.now() - start;
            console.log(`[IX] Elapsed time: ${elapsed} ms`);
        }
    }));

    await db.query(/* surql */ `DELETE page_test WHERE date IS NONE OR date < ${jobDate}`);
}

const extractText = (blocks) => {
  const text = [];
  for (const block of blocks) {
    if (block) {
      // Make the block prettier, by removing any extra spaces.
      const parts = block.split(/\s+/);
      const trimmedParts = parts.filter(Boolean); // This removes any empty strings
      const trimmedBlock = trimmedParts.join(" ");
      if (trimmedBlock.length > 0) {
        text.push(trimmedBlock);
      }
    }
  }
  return text;
};