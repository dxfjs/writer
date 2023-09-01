import { BBox, BoundingBox, TagsManager, point } from "../../utils";
import { HatchEdge, HatchEdgeType } from "./edges";
import { Point2D } from "../../types";

export interface HatchLineOptions {
  start: Point2D;
  end: Point2D;
}

export class HatchLine implements HatchEdge {
  readonly type: number;
  start: Point2D;
  end: Point2D;

  constructor(options: HatchLineOptions) {
    this.type = HatchEdgeType.Line;
    this.start = options.start;
    this.end = options.end;
  }

  bbox(): BoundingBox {
    const s = point(this.start.x, this.start.y);
    const e = point(this.end.x, this.end.y);
    return BBox.points([s, e]);
  }

  tagify(mg: TagsManager): void {
    mg.add(72, this.type);
    mg.point2d(this.start);
    mg.point2d(this.end, 1);
  }
}
