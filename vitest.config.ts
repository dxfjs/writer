import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

const r = (p: string) => resolve(__dirname, p);

export default defineConfig({
	test: {
		watch: false,
	},
	resolve: {
		alias: {
			DxfWriter: r('./src/DxfWriter'),
			DxfDocument: r('./src/DxfDocument'),
			Internals: r('./src/Internals/'),
			BlocksSection: r('./src/Sections/BlocksSection/'),
			ClassesSection: r('./src/Sections/ClassesSection/'),
			EntitiesSection: r('./src/Sections/EntitiesSection/'),
			HeaderSection: r('./src/Sections/HeaderSection/'),
			ObjectsSection: r('./src/Sections/ObjectsSection/'),
			TablesSection: r('./src/Sections/TablesSection/'),
		},
	},
});
