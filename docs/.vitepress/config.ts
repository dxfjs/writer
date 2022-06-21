import { defineConfig } from "vitepress";

export default defineConfig({
  title: "dxf",
  description: "A JavaScript dxf generator written in TypeScript.",
  lastUpdated: true,
  themeConfig: {
    logo: "/logo.svg",
    nav: [{ text: "Guide", link: "/guide/" }],
    socialLinks: [
      { icon: "github", link: "https://github.com/tarikjabiri/dxf" },
    ],
    algolia: {
      appId: "ZMSRYGPU60",
      apiKey: "4345b5f1dbb67455c34bc9422850e920",
      indexName: "dxf",
    },
    sidebar: {
      "/guide/": [
        {
          text: "Guide",
          collapsible: true,
          items: [
            { text: "Introduction", link: "/guide/" },
            { text: "Variables", link: "/guide/variables" },
            { text: "Tables", link: "/guide/tables" },
            { text: "Blocks", link: "/guide/blocks" },
            { text: "Entities", link: "/guide/entities" },
            { text: "Objects", link: "/guide/objects" },
          ],
        },
      ],
    },
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2022 Tarik EL JABIRI",
    },
  },
});
