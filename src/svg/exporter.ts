import { arcSvg, lineSvg, solidSvg, textSvg } from "./elements";
import { isArc, isDimension, isLine, isMText, isSolid } from "./guards";
import { Block } from "@/blocks";
import { Dimension } from "@/entities";
import { Document } from "@/document";

const xmlns = "http://www.w3.org/2000/svg";

export class SVGExporter {
  readonly doc: Document;
  readonly lines: string[];

  width: number;
  height: number;

  private get _svg() {
    const parts: string[] = ["<svg transform=\"scale(1, -1)\""];
    parts.push(`width="${this.width}"`);
    parts.push(`height="${this.height}"`);
    parts.push("viewBox=\"-100 -100 200 200\"");
    parts.push(`xmlns="${xmlns}">`);
    return parts.join(" ");
  }

  constructor(doc: Document) {
    this.doc = doc;
    this.lines = [];
    this.width = 2160;
    this.height = 2160;
  }

  layer(name?: string) {
    return this.doc.tables.layer.get(name || "0");
  }

  start() {
    const { doc, lines } = this;
    this.clear();
    this.lines.push(this._svg);
    this._block(doc.modelSpace);
    lines.push("</svg>");
  }

  private _block(b: Block) {
    b.entities.forEach((e) => {
      const layer = this.layer(e.layerName);
      if (isArc(e)) this.lines.push(arcSvg(e, layer));
      if (isLine(e)) this.lines.push(lineSvg(e, layer));
      if (isSolid(e)) this.lines.push(solidSvg(e, layer));
      if (isMText(e)) this.lines.push(textSvg(e, layer));
      if (isDimension(e)) this._dim(e);
    });
  }

  private _dim(dim: Dimension) {
    const b = this.doc.blocks.get(dim.blockName);
    if (b) this._block(b);
  }

  clear() {
    this.lines.length = 0;
  }

  stringify() {
    return this.lines.join("\n");
  }
}
