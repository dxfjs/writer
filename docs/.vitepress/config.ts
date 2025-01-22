import { defineConfig } from 'vitepress';
import { version } from '../../package.json';
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'

export default defineConfig({
	title: 'dxfjs',
	description: 'A JavaScript dxf generator written in TypeScript.',
	lastUpdated: true,
	head: [
		['meta', { name: 'theme-color', content: '#4caf50' }],
		['link', { rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' }],
		['script', { defer: "", src: '/_vercel/insights/script.js' }],
	],
	markdown: {
		toc: { level: [2] },
		config(md) {
			md.use(groupIconMdPlugin)
		},
	},
	themeConfig: {
		logo: '/logo.svg',
		nav: [
			{ text: 'Get Started', link: '/guide/' },
			{
				text: `v${version}`,
				items: [
					{
						text: 'Releases ',
						link: 'https://github.com/tarikjabiri/dxf/releases',
					},
					{
						text: 'npm ',
						link: 'https://www.npmjs.com/package/@tarikjabiri/dxf',
					}
				],
			}
		],
		socialLinks: [
			{ icon: 'github', link: 'https://github.com/dxfjs/writer' },
			{ icon: 'slack', link: 'https://dxfjs.slack.com' },
		],
		algolia: {
			appId: 'VYHQL6H1FK',
			apiKey: 'd12995c0f160c81f0fb1bf6138648503',
			indexName: 'dxf',
		},
		sidebar: [
			{
				text: 'Guide',
				items: [
					{ text: 'Introduction', link: '/guide/' },
					{ text: 'Header', link: '/guide/header' },
					{ text: 'Tables', link: '/guide/tables' },
					{ text: 'Blocks', link: '/guide/blocks' },
					{ text: 'Entities', link: '/guide/entities' },
					{ text: 'Objects', link: '/guide/objects' },
				],
			},
			{
				text: 'Tutoriels',
				items: [
					{ text: 'About Extended Data', link: '/tutoriels/xdata' },
				],
			},
		],
		footer: {
			message: 'Released under the MIT License.',
			copyright: 'Copyright © 2021-present Tarik EL JABIRI',
		},
		editLink: {
			pattern:
				'https://github.com/dxfjs/writer/edit/main/docs/:path',
			text: 'Edit this page on GitHub',
		},
	},
	vite: {
		plugins: [
			groupIconVitePlugin()
		],
	}
});
