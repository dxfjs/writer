import { defineConfig } from "vitepress";

export default defineConfig({
  title: "dxf",
  description: "A JavaScript dxf generator written in TypeScript.",
  lastUpdated: true,
  themeConfig: {
    logo: "/logo.svg",
    nav: [{ text: "Get Started", link: "/guide/" }],
    socialLinks: [
      { icon: "github", link: "https://github.com/tarikjabiri/dxf" },
    ],
    algolia: {
      appId: "VYHQL6H1FK",
      apiKey: "d12995c0f160c81f0fb1bf6138648503",
      indexName: "dxf",
    },
    sidebar: [
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
      {
        text: "API",
        collapsible: true,
        items: [
          { text: "DxfWriter class", link: "/api/DxfWriter" },
          { text: "Enums", link: "/api/enums" },
          { text: "Types", link: "/api/types" },
          { text: "Helper functions", link: "/api/helpers" },
        ],
      },
    ],
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2022 Tarik EL JABIRI",
    },
    editLink: {

      pattern: 'https://github.com/tarikjabiri/dxf/edit/master/docs/:path',
      text: 'Edit this page on GitHub'
    },
  },
});
