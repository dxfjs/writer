import { BBox, BoundingBox, Handle, TagsManager, extrusion } from "@/utils";
import { Entity, EntityOptions } from "./entity";
import { Point3D } from "@/types";

export interface LineOptions extends EntityOptions {
  thickness?: number;
  start: Point3D;
  end: Point3D;
  extrusion?: Point3D;
}

export class Line extends Entity {
  thickness: number;
  start: Point3D;
  end: Point3D;
  extrusion: Point3D;

  override get subClassMarker(): string {
    return "AcDbLine";
  }

  constructor(options: LineOptions, handle: Handle) {
    super("LINE", handle, options);
    this.thickness = options.thickness ?? 0;
    this.start = options.start;
    this.end = options.end;
    this.extrusion = options.extrusion || extrusion();
  }

  override bbox(): BoundingBox {
    return BBox.line(this.start, this.end);
  }

  protected override tagifyChild(mg: TagsManager): void {
    mg.add(39, this.thickness);
    mg.point(this.start);
    mg.point(this.end, 1);
    mg.point(this.extrusion, 200);
  }
}
