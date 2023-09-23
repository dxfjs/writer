import {
  BBox,
  BoundingBox,
  Handle,
  TagsManager,
  extrusion,
  point,
} from "@/utils";
import { Entity, EntityOptions } from "./entity";
import { Vertex, VertexOptions } from "./vertex";
import { Point3D } from "@/types";
import { SeqEnd } from "./seqend";

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
  vertices?: Vertex[];
  faces?: Vertex[];
}

export class Polyline extends Entity {
  elevation?: number;
  thickness?: number;
  flags: number;
  startWidth?: number;
  endWidth?: number;
  extrusion: Point3D;
  vertices: Vertex[];
  faces: Vertex[];

  readonly seqend: SeqEnd;

  override get subClassMarker(): string {
    if (this.flags & PolylineFlags.Polyline3D) return "AcDb3dPolyline";
    if (this.flags & PolylineFlags.PolyfaceMesh) return "AcDbPolyFaceMesh";
    else return "AcDb2dPolyline";
  }

  constructor(options: PolylineOptions, handle: Handle) {
    super("POLYLINE", handle, options);
    this.elevation = options.elevation;
    this.thickness = options.thickness;
    this.flags = options.flags || PolylineFlags.None;
    this.startWidth = options.startWidth;
    this.endWidth = options.endWidth;
    this.extrusion = options.extrusion || extrusion();
    this.vertices = options.vertices || [];
    this.faces = options.faces || [];

    this.seqend = new SeqEnd(handle);
    this.seqend.ownerObjectHandle = this.handleSeed;
  }

  add(options: VertexOptions) {
    const v = new Vertex(options, this.handle);
    v.ownerObjectHandle = this.ownerObjectHandle;
    v.layerName = this.layerName;
    if (v.faceRecord) this.faces.push(v);
    else this.vertices.push(v);
    return v;
  }

  override bbox(): BoundingBox {
    return BBox.points(this.vertices);
  }

  protected override tagifyChild(mg: TagsManager): void {
    mg.point(point(0, 0, this.elevation));
    mg.add(39, this.thickness);
    mg.add(70, this.flags);
    mg.add(71, this.vertices.length);
    mg.add(72, this.faces.length);
    mg.add(40, this.startWidth);
    mg.add(41, this.endWidth);
    mg.point(this.extrusion, 200);
    this.vertices.forEach((v) => v.tagify(mg));
    this.faces.forEach((f) => f.tagify(mg));
    this.seqend.tagify(mg);
  }
}
