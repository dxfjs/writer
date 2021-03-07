import ts from '@wessberg/rollup-plugin-ts'

export default {
    input: 'src/DXFWriter.ts',
    output: {
        file: 'lib/DXFWriter.js',
        name: 'DXFWriter',
        format: 'es'
    },
    plugins: [ts()],
}
