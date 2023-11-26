import { mkdirSync, writeFileSync } from "fs";
import { basename } from "path";

export { fileURLToPath } from "url";

export function save(content: string, filename: string, ext = ".dxf") {
  mkdirSync("output", { recursive: true });
  const _name = `output/${basename(filename).replace(".ts", ext)}`;
  writeFileSync(_name, content);
}
