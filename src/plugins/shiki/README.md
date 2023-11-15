# this is a modified version of this plugin

### Docusaurus Preset Shiki Twoslash

Sets up markdown code blocks to run through [shiki](https://shiki.matsu.io) which means it gets the VS Code quality
syntax highlighting mixed with the twoslash JavaScript tooling from the TypeScript website.

#### Setup

1. **Install the dependency**: `yarn add docusaurus-preset-shiki-twoslash`
1. **Include `"docusaurus-preset-shiki-twoslash"` in the presets section** of `docusaurus.config.js`

   ```diff
     presets: [
    [
      '@docusaurus/preset-classic',
      {
        // ...
      },
    ],
   + [
   +     'docusaurus-preset-shiki-twoslash',
   +     {
   +       themes: ["min-light", "nord"],
   +     },
   + ],
   ],
   ```

1. Set up light/dark mode CSS in `src/css/custom.css`:
  
  ```css
  [data-theme="light"] .shiki.nord {
     display: none;
  }

  [data-theme="dark"] .shiki.min-light {
     display: none;
  }
  ```

1. **Go read [npmjs.com/package/remark-shiki-twoslash](https://www.npmjs.com/package/remark-shiki-twoslash)** to see what is available, this package leaves all the heavy work to that module.
