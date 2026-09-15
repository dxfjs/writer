import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["./src/index.ts"],
  tsconfig: "./tsconfig.build.json",
  outDir: "./lib",
  format: ["esm", "cjs"],
  dts: true,
  outExtensions: ({ format }) => ({
    js: format === "cjs" ? ".cjs" : ".mjs",
    dts: ".d.ts",
  }),
});
