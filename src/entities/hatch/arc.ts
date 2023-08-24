import { BoundingBox, XBBox, XTagsManager, onezero, point } from "../../utils";
import { HatchEdge, HatchEdgeType } from "./edges";
import { Point2D } from "../../types";

export interface HatchArcOptions {
  center: Point2D;
  radius: number;
  start: number;
  end: number;
  clockwise?: boolean;
}

export class HatchArc implements HatchEdge {
  readonly type: number;
  center: Point2D;
  radius: number;
  start: number;
  end: number;
  clockwise: boolean;

  constructor(options: HatchArcOptions) {
    this.type = HatchEdgeType.CircularArc;
    this.center = options.center;
    this.radius = options.radius;
    this.start = options.start;
    this.end = options.end;
    this.clockwise = options.clockwise || true;
  }

  bbox(): BoundingBox {
    const c = point(this.center.x, this.center.y);
    return XBBox.point(c, this.radius);
  }

  tagify(mg: XTagsManager): void {
    mg.add(72, this.type);
    mg.point2d(this.center);
    mg.add(40, this.radius);
    mg.add(50, this.start);
    mg.add(51, this.end);
    mg.add(73, onezero(this.clockwise));
  }
}
