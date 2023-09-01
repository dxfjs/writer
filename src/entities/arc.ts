import { BBox, BoundingBox, Handle, TagsManager } from "../utils";
import { Entity, EntityOptions } from "./entity";
import { Point3D } from "../types";

export interface ArcOptions extends EntityOptions {
  thickness?: number;
  center: Point3D;
  radius: number;
  startAngle: number;
  endAngle: number;
}

export class Arc extends Entity {
  thickness?: number;
  center: Point3D;
  radius: number;
  startAngle: number;
  endAngle: number;

  override get subClassMarker(): string {
    return "AcDbCircle";
  }

  constructor(options: ArcOptions, handle: Handle) {
    super("ARC", handle, options);
    this.thickness = options.thickness;
    this.center = options.center;
    this.radius = options.radius;
    this.startAngle = options.startAngle;
    this.endAngle = options.endAngle;
  }

  override bbox(): BoundingBox {
    return BBox.point(this.center);
  }

  protected override tagifyChild(mg: TagsManager): void {
    mg.add(39, this.thickness);
    mg.point(this.center);
    mg.add(40, this.radius);
    mg.add(100, "AcDbArc");
    mg.add(50, this.startAngle);
    mg.add(51, this.endAngle);
  }
}
