import {
  BoundingBox,
  XBBox,
  XHandle,
  XTagsManager,
  extrusion,
  point,
} from "../utils";
import { EntityOptions, XEntity } from "./entity";
import { VertexFlags, VertexOptions, XVertex } from "./vertex";
import { Point3D } from "../types";
import { XSeqEnd } from "./seqend";

export const PolylineFlags = {
  None: 0,
  Closed: 1,
  CurveFitVertices: 2,
  SplineFitVertices: 4,
  Polyline3D: 8,
  Polygon3DMesh: 16,
  ClosedNurbs: 32,
  PolyfaceMesh: 64,
  ContinuousPattern: 128,
} as const;

export interface PolylineOptions extends EntityOptions {
  elevation?: number;
  thickness?: number;
  flags?: number;
  startWidth?: number;
  endWidth?: number;
  extrusion?: Point3D;
  vertices?: XVertex[];
}

export class XPolyline extends XEntity {
  elevation?: number;
  thickness?: number;
  flags: number;
  startWidth?: number;
  endWidth?: number;
  extrusion: Point3D;
  vertices: XVertex[];

  private seqend: XSeqEnd;

  override get subClassMarker(): string {
    if (this.flags & PolylineFlags.Polyline3D) return "AcDb3dPolyline";
    else return "AcDb2dPolyline";
  }

  constructor(options: PolylineOptions, handle: XHandle) {
    super("POLYLINE", handle, options);
    this.elevation = options.elevation;
    this.thickness = options.thickness;
    this.flags = options.flags || PolylineFlags.Polyline3D | PolylineFlags.Closed;
    this.startWidth = options.startWidth;
    this.endWidth = options.endWidth;
    this.extrusion = options.extrusion || extrusion();
    this.vertices = options.vertices || [];

    this.seqend = new XSeqEnd(handle);
  }

  add(options: VertexOptions) {
    const v = new XVertex(options, this.handle);
    v.flags = VertexFlags.Polyline3DVertex;
    this.vertices.push(v);
  }

  override bbox(): BoundingBox {
    return XBBox.points(this.vertices);
  }

  protected override tagifyChild(mg: XTagsManager): void {
    mg.point(point(0, 0, this.elevation));
    mg.add(39, this.thickness);
    mg.add(70, this.flags);
    mg.add(40, this.startWidth);
    mg.add(41, this.endWidth);
    mg.point(this.extrusion, 200);
    this.vertices.forEach((v) => v.tagify(mg));
    this.seqend.tagify(mg);
  }
}