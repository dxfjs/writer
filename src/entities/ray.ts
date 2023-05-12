import { BoundingBox, XBBox, XHandle, XTagsManager } from "../utils";
import { EntityOptions, XEntity } from "./entity";
import { Point3D } from "../types";

export interface RayOptions extends EntityOptions {
  start: Point3D;
  unitDirectionVector: Point3D;
}

export class XRay extends XEntity {
  start: Point3D;
  unitDirectionVector: Point3D;

  override get subClassMarker(): string {
    return "AcDbRay";
  }

  constructor(options: RayOptions, handle: XHandle) {
    super("RAY", handle, options);
    this.start = options.start;
    this.unitDirectionVector = options.unitDirectionVector;
  }

  override bbox(): BoundingBox {
    return XBBox.line(this.start, this.unitDirectionVector);
  }

  protected override tagifyChild(mg: XTagsManager): void {
    mg.point(this.start);
    mg.point(this.unitDirectionVector, 1);
  }
}
