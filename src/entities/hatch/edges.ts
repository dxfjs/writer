import { BoundingBox, XBBox, XTagsManager } from "../../utils";
import { Taggable } from "../../types";

export const HatchEdgeType = {
  Line: 1,
  CircularArc: 2,
  EllipticArc: 3,
  Spline: 4,
} as const;

export interface HatchEdge extends Taggable {
  readonly type: number;
  bbox(): BoundingBox;
}

export class HatchEdges implements Taggable {
  edges: HatchEdge[];

  constructor() {
    this.edges = [];
  }

  add<TEdge extends HatchEdge>(e: TEdge) {
    this.edges.push(e);
    return e;
  }

  bbox(): BoundingBox {
    return XBBox.boxes(this.edges.map((e) => e.bbox()));
  }

  tagify(mg: XTagsManager): void {
    mg.add(93, this.edges.length);
    this.edges.forEach((e) => e.tagify(mg));
  }
}
