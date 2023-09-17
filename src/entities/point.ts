import {
  BBox,
  BoundingBox,
  Handle,
  TagsManager,
  extrusion,
  point,
} from "@/utils";
import { Entity, EntityOptions } from "./entity";
import { Point3D } from "@/types";

export interface PointOptions extends EntityOptions, Partial<Point3D> {
  thickness?: number;
  extrusion?: Point3D;
  angleXAxis?: number;
}

export class Point extends Entity {
  x: number;
  y: number;
  z: number;
  thickness?: number;
  extrusion?: Point3D;
  angleXAxis?: number;

  override get subClassMarker(): string {
    return "AcDbPoint";
  }

  get location() {
    return point(this.x, this.y, this.z);
  }

  constructor(options: PointOptions, handle: Handle) {
    super("POINT", handle, options);
    this.x = options.x ?? 0;
    this.y = options.y ?? 0;
    this.z = options.z ?? 0;
    this.thickness = options.thickness;
    this.extrusion = options.extrusion || extrusion();
    this.angleXAxis = options.angleXAxis ?? 0;
  }

  override bbox(): BoundingBox {
    return BBox.point(this.location);
  }

  protected override tagifyChild(mg: TagsManager): void {
    mg.point(this.location);
    mg.add(39, this.thickness);
    mg.point(this.extrusion, 200);
    mg.add(50, this.angleXAxis);
  }
}
