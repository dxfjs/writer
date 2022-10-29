import typescript from 'rollup-plugin-typescript2'
import dts from 'rollup-plugin-dts'
import { deleteAsync } from 'del'
import json from '@rollup/plugin-json'
import { readFileSync } from 'fs'
const { compilerOptions } = JSON.parse(readFileSync(new URL('./tsconfig.json', import.meta.url)))

function folderDelete(folders) {
  return {
    name: 'folderDelete',
    buildEnd() {
      deleteAsync(folders, {})
    },
  }
}

const esModule = {
  file: 'lib/esm/index.js',
  format: 'es',
}

const commonJs = {
  file: 'lib/index.js',
  format: 'cjs',
}

const typescriptOptions = {
  tsconfig: 'tsconfig.build.json',
  useTsconfigDeclarationDir: true,
  
}

const jsonOptions = {
  preferConst: true,
}

export default [
  {
    input: 'src/index.ts',
    output: [esModule, commonJs],
    plugins: [json(jsonOptions), typescript(typescriptOptions)],
  },
  {
    input: './lib/src/index.d.ts',
    output: [{ file: 'lib/index.d.ts', format: 'es' }],
    plugins: [
      folderDelete(['./lib/src']),
      dts({
        compilerOptions: {
          baseUrl: './lib/src',
          paths: compilerOptions.paths,
        },
      }),
    ],
  },
]
