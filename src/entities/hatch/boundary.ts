import { BoundingBox, XBBox, XTagsManager } from "../../utils";
import { HatchArc, HatchArcOptions } from "./arc";
import { HatchEllipse, HatchEllipseOptions } from "./ellipse";
import { HatchLine, HatchLineOptions } from "./line";
import { HatchEdges } from "./edges";
import { HatchPolyline } from "./polyline";
import { Taggable } from "../../types";

export const BoundaryPathFlag = {
  Default: 0,
  External: 1,
  Polyline: 2,
  Derived: 4,
  Textbox: 8,
  Outermost: 16,
} as const;

export class XHatchBoundaryPath implements Taggable {
  flag: number;
  polylines: HatchPolyline[];
  edges: HatchEdges;

  constructor() {
    this.flag = BoundaryPathFlag.External | BoundaryPathFlag.Derived;
    this.polylines = [];
    this.edges = new HatchEdges();
  }

  arc(options: HatchArcOptions) {
    return this.edges.add(new HatchArc(options));
  }

  ellipse(options: HatchEllipseOptions) {
    return this.edges.add(new HatchEllipse(options));
  }

  line(options: HatchLineOptions) {
    return this.edges.add(new HatchLine(options));
  }

  polyline(p: HatchPolyline) {
    this.flag |= BoundaryPathFlag.Polyline;
    this.polylines.push(p);
    return p;
  }

  bbox(): BoundingBox {
    const p = XBBox.boxes(this.polylines.map((p) => p.bbox()));
    const e = this.edges.bbox();
    return XBBox.boxes([p, e]);
  }

  tagify(mg: XTagsManager): void {
    mg.add(92, this.flag);
    if (this.flag & BoundaryPathFlag.Polyline) {
      this.polylines.forEach((p) => p.tagify(mg));
    } else this.edges.tagify(mg);
    mg.add(97, 0);
  }
}
