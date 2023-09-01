import { BoundingBox, BBox, Handle, TagsManager } from "../utils";
import { EntityOptions, Entity } from "./entity";
import { Point3D } from "../types";

export interface RayOptions extends EntityOptions {
  start: Point3D;
  unitDirectionVector: Point3D;
}

export class Ray extends Entity {
  start: Point3D;
  unitDirectionVector: Point3D;

  override get subClassMarker(): string {
    return "AcDbRay";
  }

  constructor(options: RayOptions, handle: Handle) {
    super("RAY", handle, options);
    this.start = options.start;
    this.unitDirectionVector = options.unitDirectionVector;
  }

  override bbox(): BoundingBox {
    return BBox.line(this.start, this.unitDirectionVector);
  }

  protected override tagifyChild(mg: TagsManager): void {
    mg.point(this.start);
    mg.point(this.unitDirectionVector, 1);
  }
}
