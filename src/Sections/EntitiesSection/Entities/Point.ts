import { BoundingBox, boundingBox_t } from 'Internals/BoundingBox'
import Entity, { CommonEntityOptions } from '../Entity'

import { Dxfier } from 'Internals/Dxfier'
import { point3d } from 'Internals/Helpers'

export class Point extends Entity {
  x: number
  y: number
  z: number

  constructor(x: number, y: number, z: number, options?: CommonEntityOptions) {
    super('POINT', 'AcDbPoint', options)
    this.x = x
    this.y = y
    this.z = z
  }

  override boundingBox(): boundingBox_t {
    return BoundingBox.pointBBox(point3d(this.x, this.y, this.z))
  }

  protected override dxfyChild(dx: Dxfier): void {
    dx.point3d(point3d(this.x, this.y, this.z))
  }
}
