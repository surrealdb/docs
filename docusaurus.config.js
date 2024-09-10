const isProd = process.env.IS_PROD_BUILD == "true";
const config = {
  title: 'SurrealDB Docs',
  tagline: 'SurrealDB Docs',
  favicon: '/img/favicon.ico',
  url: 'https://surrealdb.com',
  baseUrl: '/docs/',
  trailingSlash: false,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: 'root',
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
          sidebarCollapsed: false,
          sidebarCollapsible: false,
          editUrl: 'https://github.com/surrealdb/docs.surrealdb.com/edit/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.scss'),
        },
      },
    ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'doc-surrealdb',
        sidebarCollapsed: true,
        sidebarCollapsible: true,
        includeCurrentVersion: false,
        routeBasePath: '/surrealdb',
        lastVersion: 'latest',
        onlyIncludeVersions: ['latest'],
        versions: {
          "latest": {
            label: ' ',
            path: '',
          },
        },
        editUrl: 'https://github.com/surrealdb/docs.surrealdb.com/edit/main/',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'doc-surrealml',
        sidebarCollapsed: true,
        sidebarCollapsible: true,
        includeCurrentVersion: false,
        routeBasePath: '/surrealml',
        lastVersion: '1.x',
        versions: {
          "1.x": {
            label: '1.x',
            path: '',
          },
        },
        editUrl: 'https://github.com/surrealdb/docs.surrealdb.com/edit/main/',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'doc-surrealist',
        sidebarCollapsed: true,
        sidebarCollapsible: true,
        includeCurrentVersion: false,
        routeBasePath: '/surrealist',
        lastVersion: '2.x',
        versions: {
          "2.x": {
            label: '2.x',
            path: '',
          },
        },
        editUrl: 'https://github.com/surrealdb/docs.surrealdb.com/edit/main/',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'doc-surrealql',
        sidebarCollapsed: true,
        sidebarCollapsible: true,
        includeCurrentVersion: false,
        routeBasePath: '/surrealql',
        lastVersion: 'latest',
        onlyIncludeVersions: ['latest'],
        versions: {
          "latest": {
            label: ' ',
            path: '',
          },
        },
        editUrl: 'https://github.com/surrealdb/docs.surrealdb.com/edit/main/',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'doc-sdk-javascript',
        sidebarCollapsed: true,
        sidebarCollapsible: true,
        includeCurrentVersion: false,
        routeBasePath: '/sdk/javascript',
        lastVersion: '1.x',
        versions: {
          "1.x": {
            label: '1.x',
            path: '',
          },
        },
        editUrl: 'https://github.com/surrealdb/docs.surrealdb.com/edit/main/',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'doc-sdk-rust',
        sidebarCollapsed: true,
        sidebarCollapsible: true,
        includeCurrentVersion: false,
        routeBasePath: '/sdk/rust',
        lastVersion: '1.x',
        versions: {
          "1.x": {
            label: '1.x',
            path: '',
          },
        },
        editUrl: 'https://github.com/surrealdb/docs.surrealdb.com/edit/main/',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'doc-sdk-python',
        sidebarCollapsed: true,
        sidebarCollapsible: true,
        includeCurrentVersion: false,
        routeBasePath: '/sdk/python',
        lastVersion: '1.x',
        versions: {
          "1.x": {
            label: '1.x',
            path: '',
          },
        },
        editUrl: 'https://github.com/surrealdb/docs.surrealdb.com/edit/main/',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'doc-sdk-dotnet',
        sidebarCollapsed: true,
        sidebarCollapsible: true,
        includeCurrentVersion: false,
        routeBasePath: '/sdk/dotnet',
        lastVersion: '1.x',
        versions: {
          "1.x": {
            label: '1.x',
            path: '',
          },
        },
        editUrl: 'https://github.com/surrealdb/docs.surrealdb.com/edit/main/',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'doc-sdk-golang',
        sidebarCollapsed: true,
        sidebarCollapsible: true,
        includeCurrentVersion: false,
        routeBasePath: '/sdk/golang',
        lastVersion: '1.x',
        versions: {
          "1.x": {
            label: '1.x',
            path: '',
          },
        },
        editUrl: 'https://github.com/surrealdb/docs.surrealdb.com/edit/main/',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'doc-sdk-java',
        sidebarCollapsed: true,
        sidebarCollapsible: true,
        includeCurrentVersion: false,
        routeBasePath: '/sdk/java',
        lastVersion: '1.x',
        versions: {
          "1.x": {
            label: '1.x',
            path: '',
          },
        },
        editUrl: 'https://github.com/surrealdb/docs.surrealdb.com/edit/main/',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'doc-sdk-php',
        sidebarCollapsed: true,
        sidebarCollapsible: true,
        includeCurrentVersion: false,
        routeBasePath: '/sdk/php',
        lastVersion: '1.x',
        versions: {
          "1.x": {
            label: '1.x',
            path: '',
          },
        },
        editUrl: 'https://github.com/surrealdb/docs.surrealdb.com/edit/main/',
      }
    ],
    'docusaurus-plugin-sass',
    ...(isProd ? [
      [
        '@docusaurus/plugin-google-gtag',
        {
          trackingID: 'G-J1NWM32T1V',
          anonymizeIP: true,
        },
      ],
    ] : []),
  ],
  themeConfig:
    ({
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
      // Replace with your project's social card
      image: '/img/docusaurus-social-card.jpg',
      navbar: {
        title: '',
        logo: {
          alt: 'SurrealDB Logo',
          src: '/img/logo-surrealdb-dark.svg',
          srcDark: '/img/logo-surrealdb.svg',
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
            href: 'https://github.com/surrealdb/docs.surrealdb.com',
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub repository',
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `&copy; <a href='https://surrealdb.com'>SurrealDB</a> &bull; <a href='https://github.com/surrealdb'>GitHub</a> &bull; <a href='https://discord.gg/surrealdb'>Discord</a> &bull; <a href='https://surrealdb.com/community'>Community</a> &bull; <a href='https://surrealdb.com/cloud'>Cloud</a> &bull; <a href='https://surrealdb.com/features'>Features</a> &bull; <a href='https://surrealdb.com/releases'>Releases</a> &bull; <a href='https://surrealdb.com/install'>Install</a>`,
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
          'csharp',
            'php',
            'markup-templating' // Required for PHP
        ]
      }
    }),
  scripts: isProd ? [
    { src: '/js/script.js', defer: true, 'data-domain': 'surrealdb.com' },
  ] : []
};

module.exports = config;
