import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/index.ts"],
  dts: "./src/index.ts",
  outDir: "lib",
  format: ["esm", "cjs"],
  sourcemap: true,
  clean: true,
  outExtension({ format }) {
    return {
      js: `.${format}.js`,
    };
  },
});
