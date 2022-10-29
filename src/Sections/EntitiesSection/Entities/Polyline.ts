import Entity, { CommonEntityOptions } from '../Entity'
import { VertexFlags, Vertex } from './Vertex'
import SeqEnd from './SeqEnd'
import { BoundingBox, boundingBox_t } from 'Internals/BoundingBox'
import { Dxfier } from 'Internals/Dxfier'
import { point3d, vec3_t } from 'Internals/Helpers'

export enum PolylineFlags {
	None = 0,
	Closed = 1,
	CurveFit = 2,
	SplineFit = 4,
	Polyline3D = 8,
	PolygonMesh3D = 16,
	PolygonMeshClosed = 32,
	PolyfaceMesh = 64,
	LinetypeGenerated = 128,
}

export enum SurfaceType {
	NoSmooth = 0,
	QuadraticBSpline = 5,
	CubicBSpline = 6,
	Bezier = 8,
}

export interface PolylineOptions extends CommonEntityOptions {
	flags?: PolylineFlags;
	elevation?: number;
	thickness?: number;
	defaultStartWidth?: number;
	defaultEndWidth?: number;
	polygonMeshM?: number;
	polygonMeshN?: number;
	smoothSurfaceM?: number;
	smoothSurfaceN?: number;
	surfaceType?: SurfaceType;
}

export interface PolylineVertex {
	point: vec3_t;
	startingWidth?: number;
	endWidth?: number;
	bulge?: number;
}

export class Polyline extends Entity {
  vertices: Vertex[]
  elevation: number
  thickness: number
  flags: PolylineFlags
  private _seqend = new SeqEnd()
  defaultStartWidth: number
  defaultEndWidth: number
  polygonMeshM: number
  polygonMeshN: number
  smoothSurfaceM: number
  smoothSurfaceN: number
  surfaceType: SurfaceType

  public constructor(vertices: PolylineVertex[], options?: PolylineOptions) {
    super('POLYLINE', 'AcDb3dPolyline', options)
    this.vertices = []
    this.thickness = options?.thickness ?? 0
    this.elevation = options?.elevation ?? 0
    this.flags = options?.flags ?? PolylineFlags.None
    this.defaultStartWidth = options?.defaultStartWidth ?? 0
    this.defaultEndWidth = options?.defaultEndWidth ?? 0
    this.polygonMeshM = options?.polygonMeshM ?? 0
    this.polygonMeshN = options?.polygonMeshN ?? 0
    this.smoothSurfaceM = options?.smoothSurfaceM ?? 0
    this.smoothSurfaceN = options?.smoothSurfaceN ?? 0
    this.surfaceType = options?.surfaceType ?? SurfaceType.NoSmooth
    vertices.forEach((v) =>
      this.vertices.push(
        new Vertex(v.point, {
          startingWidth: v.startingWidth,
          endWidth: v.endWidth,
          bulge: v.bulge,
          flags: VertexFlags.Polyline3dVertex,
        })
      )
    )
  }

  override boundingBox(): boundingBox_t {
    return BoundingBox.verticesBBox(this.vertices.map((v) => v.point))
  }

  override dxfy(dx: Dxfier): void {
    super.dxfy(dx)
    dx.push(66, 1)
    dx.point3d(point3d(0, 0, this.elevation))
    dx.push(39, this.thickness)
    dx.push(70, this.flags)
    dx.push(40, this.defaultStartWidth)
    dx.push(41, this.defaultEndWidth)
    dx.push(71, this.polygonMeshM)
    dx.push(72, this.polygonMeshN)
    dx.push(73, this.smoothSurfaceM)
    dx.push(74, this.smoothSurfaceN)
    dx.push(75, this.surfaceType)
    this.vertices.forEach((vertex) => vertex.dxfy(dx))
    this._seqend.dxfy(dx)
  }
}
