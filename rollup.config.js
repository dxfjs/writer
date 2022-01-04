import typescript from 'rollup-plugin-typescript2';

export default {
	input: 'src/DxfWriter.ts',
	output: {
		file: 'lib/DxfWriter.js',
		name: 'DxfWriter',
		format: 'es',
	},
	plugins: [typescript()],
};
