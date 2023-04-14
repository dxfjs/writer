import { BoundingBox, boundingBox_t } from 'Internals/BoundingBox'
import Entity, { CommonEntityOptions } from '../Entity'

import { Dxfier } from 'Internals/Dxfier'
import { vec3_t } from 'Internals/Helpers'

export class Line extends Entity {
  startPoint: vec3_t
  endPoint: vec3_t

  constructor(startPoint: vec3_t, endPoint: vec3_t, options?: CommonEntityOptions) {
    super('LINE', 'AcDbLine', options)
    this.startPoint = startPoint
    this.endPoint = endPoint
  }

  override boundingBox(): boundingBox_t {
    return BoundingBox.lineBBox(this.startPoint, this.endPoint)
  }

  protected override dxfyChild(dx: Dxfier): void {
    dx.point3d(this.startPoint)
    dx.point3d(this.endPoint, 1)
  }
}
