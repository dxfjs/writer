import { BoundingBox, BBox, TagsManager, onezero, point } from "../../utils";
import { HatchEdge, HatchEdgeType } from "./edges";
import { Point2D } from "../../types";

export interface HatchEllipseOptions {
  center: Point2D;
  endpoint: Point2D;
  ratio: number;
  start: number;
  end: number;
  clockwise?: boolean;
}

export class HatchEllipse implements HatchEdge {
  type: number;
  center: Point2D;
  endpoint: Point2D;
  ratio: number;
  start: number;
  end: number;
  clockwise: boolean;

  constructor(options: HatchEllipseOptions) {
    this.type = HatchEdgeType.EllipticArc;
    this.center = options.center;
    this.endpoint = options.endpoint;
    this.ratio = options.ratio;
    this.start = options.start;
    this.end = options.end;
    this.clockwise = options.clockwise || true;
  }

  bbox(): BoundingBox {
    const { x, y } = this.endpoint;
    const radius = Math.sqrt(x * x + y * y);
    const c = point(this.center.x, this.center.y);
    return BBox.point(c, radius);
  }

  tagify(mg: TagsManager): void {
    mg.add(72, this.type);
    mg.point2d(this.center);
    mg.point2d(this.endpoint, 1);
    mg.add(40, this.ratio);
    mg.add(50, this.start);
    mg.add(51, this.end);
    mg.add(73, onezero(this.clockwise));
  }
}
