import { EntityOptions, XEntity } from "./entity";
import { XHandle, XTagsManager } from "../utils";
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
  firstVertexIndex?: number;
  secondVertexIndex?: number;
  thirdVertexIndex?: number;
  fourthVertexIndex?: number;
  identifier?: number;
}

export class XVertex extends XEntity implements Point3D {
  z: number;
  x: number;
  y: number;
  startingWidth?: number;
  endingWidth?: number;
  bulge: number;
  flags: number;
  tangentDirection?: number;
  firstVertexIndex?: number;
  secondVertexIndex?: number;
  thirdVertexIndex?: number;
  fourthVertexIndex?: number;
  identifier?: number;

  override get subClassMarker(): string {
    return "AcDbVertex";
  }

  constructor(options: VertexOptions, handle: XHandle) {
    super("VERTEX", handle, options);
    this.x = options.x ?? 0;
    this.y = options.y ?? 0;
    this.z = options.z ?? 0;
    this.startingWidth = options.startingWidth;
    this.endingWidth = options.endingWidth;
    this.bulge = options.bulge ?? 0;
    this.flags = options.flags ?? VertexFlags.None;
    this.tangentDirection = options.tangentDirection;
    this.firstVertexIndex = options.firstVertexIndex;
    this.secondVertexIndex = options.secondVertexIndex;
    this.thirdVertexIndex = options.thirdVertexIndex;
    this.fourthVertexIndex = options.fourthVertexIndex;
    this.identifier = options.identifier;
  }

  private vertexSubclassMarker(): string {
    if (this.flags & VertexFlags.Polyline3DVertex) {
      return "AcDb3dPolylineVertex";
    } else if (this.flags & VertexFlags.PolyfaceMeshVertex) {
      return "AcDbPolyFaceMeshVertex";
    } else {
      return "AcDb2dVertex";
    }
  }

  protected override tagifyChild(mg: XTagsManager): void {
    mg.add(100, this.vertexSubclassMarker());
    mg.point(this);
    mg.add(40, this.startingWidth);
    mg.add(41, this.endingWidth);
    mg.add(42, this.bulge);
    mg.add(70, this.flags);
    mg.add(50, this.tangentDirection);
    mg.add(71, this.firstVertexIndex);
    mg.add(72, this.secondVertexIndex);
    mg.add(73, this.thirdVertexIndex);
    mg.add(74, this.fourthVertexIndex);
    mg.add(91, this.identifier);
  }
}
