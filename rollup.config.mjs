import del from "./plugins/rollup-plugin-delete.mjs";
import dts from "rollup-plugin-dts";
import json from "@rollup/plugin-json";
import { readFileSync } from "fs";
import terser from "@rollup/plugin-terser";
import typescript from "rollup-plugin-typescript2";

const { compilerOptions } = JSON.parse(readFileSync("./tsconfig.json"));
const { main, module } = JSON.parse(readFileSync("./package.json"));

const output = [
  {
    file: module,
    format: "es",
  },
  {
    file: main,
    format: "cjs",
  },
];

const ts = typescript({
  tsconfig: "tsconfig.build.json",
  useTsconfigDeclarationDir: true,
});

const jsn = json({
  preferConst: true,
});

export default [
  {
    input: "src/index.ts",
    output,
    plugins: [del(["./lib"], []), terser(), jsn, ts],
  },
  {
    input: "./lib/src/index.d.ts",
    output: [{ file: "lib/index.d.ts", format: "es" }],
    plugins: [
      dts({
        compilerOptions: {
          baseUrl: "./lib/src",
          paths: compilerOptions.paths,
        },
      }),
      del([], ["./lib/src"]),
    ],
  },
];
