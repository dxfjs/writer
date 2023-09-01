import { Entity, EntityOptions } from "./entity";
import { Handle, TagsManager } from "../utils";
import { Point3D } from "../types";

export const VertexFlags = {
  None: 0,
  ExtraVertex: 1,
  CurveFit: 2,
  NotUsed: 4,
  SplineVertex: 8,
  SplineControlPoint: 16,
  Polyline3DVertex: 32,
  Polyline3DMesh: 64,
  PolyfaceMeshVertex: 128,
} as const;

export interface VertexOptions extends EntityOptions, Partial<Point3D> {
  startingWidth?: number;
  endingWidth?: number;
  bulge?: number;
  flags?: number;
  tangentDirection?: number;
  indices?: number[];
  faceRecord?: boolean;
  identifier?: number;
}

export class Vertex extends Entity implements Point3D {
  z: number;
  x: number;
  y: number;
  startingWidth?: number;
  endingWidth?: number;
  bulge: number;
  flags: number;
  tangentDirection?: number;
  indices?: number[];
  faceRecord?: boolean;
  identifier?: number;

  override get subClassMarker(): string {
    if (this.faceRecord) return "AcDbFaceRecord";
    return "AcDbVertex";
  }

  constructor(options: VertexOptions, handle: Handle) {
    super("VERTEX", handle, options);
    this.x = options.x ?? 0;
    this.y = options.y ?? 0;
    this.z = options.z ?? 0;
    this.startingWidth = options.startingWidth;
    this.endingWidth = options.endingWidth;
    this.bulge = options.bulge ?? 0;
    this.flags = options.flags ?? VertexFlags.None;
    this.tangentDirection = options.tangentDirection;
    this.indices = options.indices;
    this.faceRecord = options.faceRecord;
    this.identifier = options.identifier;
  }

  private vertexSubclassMarker() {
    if (this.faceRecord) return undefined;
    if (this.flags & VertexFlags.Polyline3DVertex) {
      return "AcDb3dPolylineVertex";
    } else if (this.flags & VertexFlags.PolyfaceMeshVertex) {
      return "AcDbPolyFaceMeshVertex";
    } else return "AcDb2dVertex";
  }

  protected override tagifyChild(mg: TagsManager): void {
    mg.add(100, this.vertexSubclassMarker());
    mg.point(this);
    mg.add(40, this.startingWidth);
    mg.add(41, this.endingWidth);
    mg.add(42, this.bulge);
    mg.add(70, this.flags);
    mg.add(50, this.tangentDirection);
    if (this.faceRecord && this.indices) {
      mg.add(71, this.indices.at(0));
      mg.add(72, this.indices.at(1));
      mg.add(73, this.indices.at(2));
      mg.add(74, this.indices.at(3));
    }
    mg.add(91, this.identifier);
  }
}
