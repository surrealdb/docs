const fs = require('fs');
const isProd = process.env.IS_PROD_BUILD == "true";
const config = {
  title: 'SurrealDB Docs',
  tagline: 'SurrealDB Docs',
  favicon: 'img/favicon.ico',
  // Set the production url of your site here
  url: 'https://surrealdb.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/docs/',
  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'SurrealDB', // Usually your GitHub org/user name.
  projectName: 'docs.surrealdb.com', // Usually your repo name.
  // TODO We need to fix these issues, just not doing it now :)
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  plugins: [
    'docusaurus-plugin-sass',
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'rust',
        path: "./sdks/rust",
        routeBasePath: "./sdks/rust",
        include: ["**/*.md"],
        sidebarPath: require.resolve('./sdks/rust/sidebarsRust.js'),
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'golang',
        path: "./sdks/golang",
        routeBasePath: "./sdks/golang",
        include: ["**/*.md"],
        sidebarPath: require.resolve('./sdks/golang/sidebarsGolang.js'),
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'node',
        path: "./sdks/node",
        routeBasePath: "./sdks/node",
        include: ["**/*.md"],
        sidebarPath: require.resolve('./sdks/node/sidebarsNode.js'),
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'python',
        path: "./sdks/python",
        routeBasePath: "./sdks/node",
        include: ["**/*.md"],
        sidebarPath: require.resolve('./sdks/python/sidebarsPython.js'),
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'deno',
        path: "./sdks/deno",
        routeBasePath: "./sdks/deno",
        include: ["**/*.md"],
        sidebarPath: require.resolve('./sdks/deno/sidebarsDeno.js'),
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'java',
        path: "./sdks/java",
        routeBasePath: "./sdks/java",
        include: ["**/*.md"],
        sidebarPath: require.resolve('./sdks/java/sidebarsJava.js'),
      },
    ],
    // [
    //   './plugins/shiki',
    //   {
    //     themes: ["min-light", "nord"],
    //   },
    // ],
    ...(isProd ? [
      [
        'docusaurus-plugin-sentry',
        {
          DSN: "https://0fe0e9353babce33f5c128474af95ebf@o4506711289757696.ingest.sentry.io/4506711303127040",
          sentry: {
            init: {
              ignoreErrors: [
                'Non-Error promise rejection captured with value',
              ],
              // Enable session replay
              // integrations: [
              //   Sentry.replayIntegration({
              //     maskAllText: false,
              //     blockAllMedia: false,
              //     workerUrl: "/assets/replay-worker.js",
              //   }),
              // ],
              // Monitor performance for 100% of sessions
              tracesSampleRate: 1.0,
              // Enable session replays for 10% of all sessions
              replaysSessionSampleRate: 0.1,
              // Enable session replays for 100% of all sessions with errors
              replaysOnErrorSampleRate: 1.0,
            }
          }
        },
      ],
      [
        '@docusaurus/plugin-google-gtag',
        {
          gtag: {
            trackingID: 'G-J1NWM32T1V',
            anonymizeIP: true,
          },
        },
      ],
    ] : []),
  ],
  presets: [
    [
      'classic',
      ({
        docs: {
          routeBasePath: '/surrealdb',
          lastVersion: '1.2.x',
          versions: {
            "1.1.x": {
              label: '1.1.x',
              path: '1.1.x',
            },
            nightly: {
              label: 'Nightly',
              path: 'nightly',
            },
            '1.2.x': { 
              label: '1.2.x',
              path: '',
            },
            '1.0.x': { 
              label: '1.0.x',
              path: '1.0.x',
            },
          },
          includeCurrentVersion: false,
          editUrl:
            'https://github.com/surrealdb/docs.surrealdb.com/edit/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.scss'),
        },
      }),
    ],
    // [
    //   './src/plugins/shiki',
    //   {
    //     theme: JSON.parse(fs.readFileSync('./src/grammars/surrealql-theme.json', 'utf-8')),
    //     langs: [
    //       {
    //         id: 'surql',
    //         scopeName: 'source.surrealql',
    //         grammar: JSON.parse(fs.readFileSync('./src/grammars/surrealql.tmLanguage.json', 'utf-8')),
    //         aliases: ['surrealql']
    //       },
    //       'javascript',
    //       'typescript',
    //       'bash',
    //       'shell',
    //       'yaml',
    //       'markdown',
    //       'python',
    //       'json',
    //       'rust',
    //       'jsx',
    //       'sql',
    //       'java',
    //       'go',
    //       'jsx',
    //       'csharp'
    //     ],
    //   },
    // ],
  ],
  themeConfig:
    ({
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: '',
        logo: {
          alt: 'SurrealDB Logo',
          src: 'img/logo-surrealdb-dark.svg',
          srcDark: 'img/logo-surrealdb.svg',
        },
        items: [
          {
            to: 'https://surrealdb.com',
            position: 'right',
            className: 'navbar-surreal',
            'aria-label': 'SurrealDB.com',
            label: 'SurrealDB.com',
            target: '_blank',
            icon: 'none'
          },
          {
            type: 'docsVersionDropdown',
            position: 'right',
          },
          {
            href: 'https://github.com/surrealdb/docs.surrealdb.com',
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub repository',
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `&copy; SurrealDB - <a href='https://surrealdb.com'>SurrealDB.com</a> - <a href='https://github.com/surrealdb'>GitHub</a> - <a href='https://discord.gg/surrealdb'>Discord</a> -  <a href='https://surrealdb.com/community'>Community</a> - <a href='https://surrealdb.com/products'>Products</a> - <a href='https://surrealdb.com/features'>Features</a> - <a href='https://surrealdb.com/releases'>Releases</a> `,
      },
      prism: {
        additionalLanguages: [
          'javascript',
          'typescript',
          'bash',
          'yaml',
          'markdown',
          'python',
          'json',
          'rust',
          'jsx',
          'sql',
          'java',
          'go',
          'jsx',
          'csharp'
        ]
      }
    }),
  scripts: isProd ? [
    { src: '/js/script.js', defer: true, 'data-domain': 'surrealdb.com' },
  ] : []
};

module.exports = config;
