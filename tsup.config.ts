import { Options, defineConfig } from "tsup";

type CustomOptions = Pick<Options, "format" | "dts" | "globalName">;

function defineOptions({ format, dts, globalName }: CustomOptions): Options {
  return {
    entry: ["./src/index.ts", "./src/helpers/index.ts", "./src/svg/index.ts"],
    outDir: "lib",
    format,
    dts,
    globalName,
    sourcemap: true,
    clean: true,
    splitting: false,
  };
}

const esm: Options = defineOptions({ format: "esm", dts: true });
const cjs: Options = defineOptions({ format: "cjs" });
const iife: Options = defineOptions({
  format: "iife",
  globalName: "DXFWriter",
});

export default defineConfig([esm, cjs, iife]);
