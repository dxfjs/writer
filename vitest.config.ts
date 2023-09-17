import { defineConfig } from "vitest/config";
import { resolve } from "path";

const _resolve = (path: string) => resolve(__dirname, path);

export default defineConfig({
  test: {
    watch: false,
    globals: true,
    environment: "node",
    alias: {
      "@": _resolve("./src/"),
    },
  },
});
