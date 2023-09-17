import {
  BBox,
  BoundingBox,
  Handle,
  TagsManager,
  extrusion,
} from "@/utils";
import { Entity, EntityOptions } from "./entity";
import { Point3D } from "@/types";

export interface CircleOptions extends EntityOptions {
  thickness?: number;
  center: Point3D;
  radius: number;
  extrusion?: Point3D;
}

export class Circle extends Entity {
  thickness?: number;
  center: Point3D;
  radius: number;
  extrusion: Point3D;

  override get subClassMarker(): string {
    return "AcDbCircle";
  }

  constructor(options: CircleOptions, handle: Handle) {
    super("CIRCLE", handle, options);
    this.thickness = options.thickness;
    this.center = options.center;
    this.radius = options.radius;
    this.extrusion = options.extrusion || extrusion();
  }

  override bbox(): BoundingBox {
    return BBox.point(this.center);
  }

  protected override tagifyChild(mg: TagsManager): void {
    mg.add(39, this.thickness);
    mg.point(this.center);
    mg.add(40, this.radius);
    mg.point(this.extrusion, 200);
  }
}
