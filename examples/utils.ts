import { existsSync, mkdirSync, writeFileSync } from "fs";
import { basename } from "path";

export { fileURLToPath } from "url";

export function save(content: string, filename: string) {
  if (!existsSync("output")) mkdirSync("output", { recursive: true });
  const _name = `output/${basename(filename).replace(".ts", ".dxf")}`;
  writeFileSync(_name, content);
}
