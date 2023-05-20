import { defineConfig } from "vitepress";
import { version } from "../../package.json";

export default defineConfig({
  title: "dxfjs",
  description: "A JavaScript dxf generator written in TypeScript.",
  lastUpdated: true,
  head: [
    ["meta", { name: "theme-color", content: "#4caf50" }],
    ["link", { rel: "icon", href: "/logo.svg", type: "image/svg+xml" }],
    ["script", { defer: "", src: "/_vercel/insights/script.js" }],
  ],
  markdown: {
    theme: {
      light: "github-light",
      dark: "github-dark",
    },
  },
  themeConfig: {
    logo: "/logo.svg",
    nav: [
      {
        text: `v${version}`,
        items: [
          {
            text: "Releases ",
            link: "https://github.com/tarikjabiri/dxf/releases",
          },
          {
            text: "npm ",
            link: "https://www.npmjs.com/package/@tarikjabiri/dxf",
          },
        ],
      },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/dxfjs/writer" },
      { icon: "slack", link: "https://dxfjs.slack.com" },
    ],
    algolia: {
      appId: "VYHQL6H1FK",
      apiKey: "d12995c0f160c81f0fb1bf6138648503",
      indexName: "dxf",
    },
    sidebar: {
      "/": sidebar(),
      "/v2/": v2SideBar(),
    },
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2021-present Tarik EL JABIRI",
    },
    editLink: {
      pattern: "https://github.com/dxfjs/writer/edit/main/docs/:path",
      text: "Edit this page on GitHub",
    },
  },
});

function sidebar() {
  return [
    {
      text: "Introduction",
      collapsed: false,
      items: [{ text: "Get started", link: "/start" }],
    },
    {
      text: "Sections",
      collapsed: false,
      items: [
        { text: "Header", link: "/sections/header" },
        { text: "Entities", link: "/sections/entities" },
      ],
    },
    {
      text: "Guides",
      collapsed: false,
      items: [{ text: "MText", link: "/guides/mtext" }],
    },
  ];
}

function v2SideBar() {
  return [
    {
      text: "Guide",
      items: [
        { text: "Introduction", link: "/v2/guide/" },
        { text: "Header", link: "/v2/guide/header" },
        { text: "Tables", link: "/v2/guide/tables" },
        { text: "Blocks", link: "/v2/guide/blocks" },
        { text: "Entities", link: "/v2/guide/entities" },
        { text: "Objects", link: "/v2/guide/objects" },
      ],
    },
    {
      text: "Tutoriels",
      items: [{ text: "About Extended Data", link: "/v2/tutoriels/xdata" }],
    },
  ];
}
