import { BoundingBox, boundingBox_t } from 'Internals/BoundingBox'
import Entity, { CommonEntityOptions } from '../Entity'
import { point3d, vec2_t } from 'Internals/Helpers'

import { Dxfier } from 'Internals/Dxfier'

export enum LWPolylineFlags {
	None = 0,
	Closed = 1,
	Plinegen = 128,
}

export interface LWPolylineOptions extends CommonEntityOptions {
	flags?: LWPolylineFlags;
	constantWidth?: number;
	elevation?: number;
	thickness?: number;
}

export interface LWPolylineVertex {
	point: vec2_t;
	startingWidth?: number;
	endWidth?: number;
	bulge?: number;
}

export class LWPolyline extends Entity {
  vertices: LWPolylineVertex[]
  flags: LWPolylineFlags
  constantWidth: number
  elevation: number
  thickness: number

  constructor(vertices: LWPolylineVertex[], options?: LWPolylineOptions) {
    super('LWPOLYLINE', 'AcDbPolyline', options)
    this.vertices = vertices
    this.flags = options?.flags || LWPolylineFlags.None
    this.constantWidth = options?.constantWidth || 0
    this.elevation = options?.elevation || 0
    this.thickness = options?.thickness || 0
  }

  override boundingBox(): boundingBox_t {
    return BoundingBox.verticesBBox(
      this.vertices.map((vertex) => point3d(vertex.point.x, vertex.point.y, 0))
    )
  }

  protected override dxfyChild(dx: Dxfier): void {
    dx.push(90, this.vertices.length)
    dx.push(70, this.flags || 0)

    if (
      !this.vertices.find((v) => {
        return (v.startingWidth ?? 0) > 0 && (v.endWidth ?? 0) > 0
      })
    ) {
      dx.push(43, this.constantWidth)
    }
    dx.elevation(this.elevation)
    dx.thickness(this.thickness)
    for (const v of this.vertices) {
      dx.point2d(v.point)
      dx.push(40, v.startingWidth)
      dx.push(41, v.endWidth)
      dx.push(42, v.bulge)
    }
    dx.push(210, this.extrusion?.x)
    dx.push(220, this.extrusion?.y)
    dx.push(230, this.extrusion?.z)
  }
}
