import { BBox, BoundingBox, TagsManager, extrusion } from "@/utils";
import { Entity, EntityOptions } from "./entity";
import { Point3D } from "@/types";

export interface EllipseOptions extends EntityOptions {
  center: Point3D;
  endpoint: Point3D;
  extrusion?: Point3D;
  ratio?: number;
  start?: number;
  end?: number;
}

export class Ellipse extends Entity {
  center: Point3D;
  endpoint: Point3D;
  extrusion: Point3D;
  ratio: number;
  start: number;
  end: number;

  override get subClassMarker(): string | undefined {
    return "AcDbEllipse";
  }

  constructor(options: EllipseOptions) {
    super(options);
    this._type = "ELLIPSE";
    this.center = options.center;
    this.endpoint = options.endpoint;
    this.extrusion = options.extrusion || extrusion();
    this.ratio = options.ratio ?? 1;
    this.start = options.start ?? 0;
    this.end = options.end ?? 2 * Math.PI;
  }

  override bbox(): BoundingBox {
    const { x, y, z } = this.endpoint;
    const radius = Math.sqrt(x * x + y * y + z * z);
    return BBox.point(this.center, radius);
  }

  protected override tagifyChild(mg: TagsManager): void {
    mg.point(this.center);
    mg.point(this.endpoint, 1);
    mg.point(this.extrusion, 200);
    mg.add(40, this.ratio);
    mg.add(41, this.start);
    mg.add(42, this.end);
  }
}
