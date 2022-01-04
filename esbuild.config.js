import { build } from 'esbuild';

build({
	entryPoints: ['./src/DxfWriter.ts'],
	outfile: 'lib/DxfWriter.js',
	bundle: false,
	sourcemap: false,
	format: 'esm',
	//minify: true,
	target: 'esnext',
}).catch(() => process.exit(1));
