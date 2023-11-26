import { Document } from "@/document";
import { SVGExporter } from "./exporter";

export function svg(doc: Document) {
  const exporter = new SVGExporter(doc);
  exporter.start();
  return exporter.stringify();
}
