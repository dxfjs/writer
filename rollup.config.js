import typescript from 'rollup-plugin-typescript2';

export default {
	input: 'src/index.ts',
	output: [{
		file: 'lib/esm/index.js',
		name: 'DxfWriter',
		format: 'es',
	},
		{
			file: 'lib/index.js',
			name: 'DxfWriter',
			format: 'cjs',
		}],
	plugins: [typescript()],
};
