import { Options, defineConfig } from "tsup";

function defineOptions({ format, dts }: Pick<Options, "format" | "dts">) {
  return {
    entry: ["./src/index.ts"],
    outDir: "lib",
    format,
    dts,
    sourcemap: true,
    clean: true,
  };
}

const esm: Options = defineOptions({ format: "esm", dts: true });
const cjs: Options = defineOptions({ format: "cjs" });
const iife: Options = defineOptions({ format: "iife" });

export default defineConfig([esm, cjs, iife]);
