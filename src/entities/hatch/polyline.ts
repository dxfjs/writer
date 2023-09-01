import { BoundingBox, BBox, TagsManager, onezero, point } from "../../utils";
import { Point2D, Taggable } from "../../types";

export interface HatchPolylineVertex extends Point2D {
  bulge?: number;
}

export interface HatchPolylineOptions {
  vertices?: HatchPolylineVertex[];
  isClosed?: boolean;
}

export class HatchPolyline implements Taggable {
  isClosed?: boolean;
  vertices: HatchPolylineVertex[];

  constructor(options: HatchPolylineOptions) {
    this.isClosed = options.isClosed;
    this.vertices = options.vertices || [];
  }

  add(vertex: HatchPolylineVertex) {
    this.vertices.push(vertex);
  }

  bbox(): BoundingBox {
    return BBox.points(this.vertices.map((v) => point(v.x, v.y)));
  }

  tagify(mg: TagsManager): void {
    mg.add(72, onezero(this.hasBulge()));
    mg.add(73, onezero(this.isClosed));
    mg.add(93, this.vertices.length);
    this.vertices.forEach((v) => {
      mg.point2d(v);
      mg.add(42, v.bulge);
    });
  }

  private hasBulge(): boolean {
    return this.vertices.some((v) => v.bulge != null);
  }
}
