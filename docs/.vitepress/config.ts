import { defineConfig } from 'vitepress';
import { version } from '../../package.json'

export default defineConfig({
	title: 'dxfjs',
	description: 'A JavaScript dxf generator written in TypeScript.',
	lastUpdated: true,
	head: [
		['meta', { name: 'theme-color', content: '#4caf50' }],
		['link', { rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' }],
	],
	markdown: {
		toc: { level: [2] },
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
				collapsible: true,
				items: [
					{ text: 'Introduction', link: '/guide/' },
					{ text: 'Variables', link: '/guide/variables' },
					{ text: 'Tables', link: '/guide/tables' },
					{ text: 'Blocks', link: '/guide/blocks' },
					{ text: 'Entities', link: '/guide/entities' },
					{ text: 'Objects', link: '/guide/objects' },
				],
			},
			{
				text: 'API',
				collapsible: true,
				items: [
					{ text: 'DxfWriter class', link: '/api/DxfWriter' },
					{ text: 'Enums', link: '/api/Enums' },
					{ text: 'Types', link: '/api/Types' },
					{ text: 'Helper functions', link: '/api/helpers' },
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
});
