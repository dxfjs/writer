import typescript from 'rollup-plugin-typescript2';

export default {
	input: 'src/index.ts',
	output: {
		file: 'lib/index.js',
		name: 'DxfWriter',
		format: 'es',
	},
	plugins: [typescript()],
};
