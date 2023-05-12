import {
  BoundingBox,
  XBBox,
  XHandle,
  XTagsManager,
  extrusion,
  point,
} from "../utils";
import { EntityOptions, XEntity } from "./entity";
import { Point3D } from "../types";

export interface PointOptions extends EntityOptions, Partial<Point3D> {
  thickness?: number;
  extrusion?: Point3D;
  angleXAxis?: number;
}

export class XPoint extends XEntity {
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

  constructor(options: PointOptions, handle: XHandle) {
    super("POINT", handle, options);
    this.x = options.x ?? 0;
    this.y = options.y ?? 0;
    this.z = options.z ?? 0;
    this.thickness = options.thickness;
    this.extrusion = options.extrusion || extrusion();
    this.angleXAxis = options.angleXAxis ?? 0;
  }

  override bbox(): BoundingBox {
    return XBBox.point(this.location);
  }

  protected override tagifyChild(mg: XTagsManager): void {
    mg.point(this.location);
    mg.add(39, this.thickness);
    mg.point(this.extrusion, 200);
    mg.add(50, this.angleXAxis);
  }
}
