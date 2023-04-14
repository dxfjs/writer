import { BoundingBox, boundingBox_t } from 'Internals/BoundingBox'
import Entity, { CommonEntityOptions } from '../Entity'

import { Dxfier } from 'Internals/Dxfier'
import { vec3_t } from 'Internals/Helpers'

export class Ellipse extends Entity {
  center: vec3_t
  endPointOfMajorAxis: vec3_t
  ratioOfMinorAxisToMajorAxis: number
  startParameter: number
  endParameter: number

  constructor(
    center: vec3_t,
    endPointOfMajorAxis: vec3_t,
    ratioOfMinorAxisToMajorAxis: number,
    startParameter: number,
    endParameter: number,
    options?: CommonEntityOptions
  ) {
    super('ELLIPSE', 'AcDbEllipse', options)
    this.center = center
    this.endPointOfMajorAxis = endPointOfMajorAxis
    this.ratioOfMinorAxisToMajorAxis = ratioOfMinorAxisToMajorAxis
    this.startParameter = startParameter
    this.endParameter = endParameter
  }

  override boundingBox(): boundingBox_t {
    const x = this.center.x
    const y = this.center.y
    const xEndPointOfMajorAxis = this.endPointOfMajorAxis.x
    const yEndPointOfMajorAxis = this.endPointOfMajorAxis.y

    const bigRadius = Math.sqrt(
      Math.pow(x - (x + xEndPointOfMajorAxis), 2) +
				Math.pow(y - (y + yEndPointOfMajorAxis), 2)
    )
    return BoundingBox.centerRadiusBBox(this.center, bigRadius)
  }

  protected override dxfyChild(dx: Dxfier): void {
    dx.point3d(this.center)
    dx.point3d(this.endPointOfMajorAxis, 1)
    dx.push(40, this.ratioOfMinorAxisToMajorAxis)
    dx.push(41, this.startParameter)
    dx.push(42, this.endParameter)
  }
}
