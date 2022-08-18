import typescript from 'rollup-plugin-typescript2';
import dts from 'rollup-plugin-dts';
import { deleteAsync } from 'del';
import json from '@rollup/plugin-json';

function folderDelete(folders) {
	return {
		name: 'folderDelete',
		buildEnd() {
			deleteAsync(folders, {});
		},
	};
}

const tsconfigBuild = {
	compilerOptions: {
		declaration: true,
		declarationDir: './lib',
		moduleResolution: 'node',
		esModuleInterop: true,
		strict: true,
		skipLibCheck: true,
		noUnusedLocals: true,
		types: ['vitest/globals'],
	},
	include: ['./src', './package.json'],
};

const esModule = {
	file: 'lib/esm/index.js',
	format: 'es',
};

const commonJs = {
	file: 'lib/index.js',
	format: 'cjs',
};

const typescriptOptions = {
	tsconfigDefaults: tsconfigBuild,
	useTsconfigDeclarationDir: true,
};

const jsonOptions = {
	preferConst: true,
};

export default [
	{
		input: 'src/index.ts',
		output: [esModule, commonJs],
		plugins: [json(jsonOptions), typescript(typescriptOptions)],
	},
	{
		input: './lib/src/index.d.ts',
		output: [{ file: 'lib/index.d.ts', format: 'es' }],
		plugins: [folderDelete(['./lib/src']), dts()],
	},
];
