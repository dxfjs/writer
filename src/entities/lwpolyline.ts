import {
  BoundingBox,
  XBBox,
  XHandle,
  XTagsManager,
  extrusion,
  point,
} from "../utils";
import { EntityOptions, XEntity } from "./entity";
import { Point2D, Point3D } from "../types";

export interface LWPolylineVertex extends Point2D {
  startingWidth?: number;
  endWidth?: number;
  bulge?: number;
}

export interface LWPolylineOptions extends EntityOptions {
  vertices?: LWPolylineVertex[];
  flags?: number;
  constantWidth?: number;
  elevation?: number;
  thickness?: number;
  extrusion?: Point3D;
}

export const LWPolylineFlags = {
  None: 0,
  Closed: 1,
  Plinegen: 128,
} as const;

export class XLWPolyline extends XEntity {
  vertices: LWPolylineVertex[];
  flags: number;
  constantWidth: number;
  elevation: number;
  thickness: number;
  extrusion: Point3D;

  override get subClassMarker(): string {
    return "AcDbPolyline";
  }

  constructor(options: LWPolylineOptions, handle: XHandle) {
    super("LWPOLYLINE", handle, options);
    this.vertices = options.vertices || [];
    this.flags = options.flags ?? LWPolylineFlags.None;
    this.constantWidth = options.constantWidth ?? 0;
    this.elevation = options.elevation ?? 0;
    this.thickness = options.thickness ?? 0;
    this.extrusion = options.extrusion || extrusion();
  }

  add(v: LWPolylineVertex) {
    this.vertices.push(v);
  }

  override bbox(): BoundingBox {
    return XBBox.points(this.vertices.map((v) => point(v.x, v.y)));
  }

  protected override tagifyChild(mg: XTagsManager): void {
    mg.add(90, this.vertices.length);
    mg.add(70, this.flags);
    mg.add(43, this.constantWidth);
    mg.add(38, this.elevation);
    mg.add(39, this.thickness);
    this.vertices.forEach((v) => {
      mg.point2d(v);
      mg.add(40, v.startingWidth);
      mg.add(41, v.endWidth);
      mg.add(42, v.bulge);
    });
    mg.point(this.extrusion, 200);
  }
}
