import { BoundingBox, boundingBox_t } from 'Internals/BoundingBox'
import Entity, { CommonEntityOptions } from '../Entity'

import { Dxfier } from 'Internals/Dxfier'
import { vec3_t } from 'Internals/Helpers'

export enum VertexFlags {
	None = 0,
	ExtraVertex = 1,
	CurveFit = 2,
	NotUsed = 4,
	SplineVertex = 8,
	SplineFrame = 16,
	Polyline3dVertex = 32,
	Polygon3dMesh = 64,
	PolyfaceMeshVertex = 128,
}

export interface VertexOptions extends CommonEntityOptions {
	flags?: VertexFlags;
	startingWidth?: number;
	endWidth?: number;
	bulge?: number;
}

export class Vertex extends Entity {
  point: vec3_t
  flags: VertexFlags
  startingWidth?: number
  endWidth?: number
  bulge?: number

  constructor(point: vec3_t, options?: VertexOptions) {
    super('VERTEX', 'AcDbVertex', options)
    this.point = point
    this.flags = options?.flags ?? VertexFlags.None
    if (options) {
      if ('startingWidth' in options) this.startingWidth = options.startingWidth
      if ('endWidth' in options) this.endWidth = options.endWidth
      if ('bulge' in options) this.bulge = options.bulge
    }
  }

  override boundingBox(): boundingBox_t {
    return BoundingBox.pointBBox(this.point)
  }

  override dxfy(dx: Dxfier): void {
    super.dxfy(dx)
    dx.subclassMarker('AcDb3dPolylineVertex')
    dx.point3d(this.point)
    dx.push(40, this.startingWidth)
    dx.push(41, this.endWidth)
    dx.push(42, this.bulge)
    dx.push(70, this.flags)
  }
}
