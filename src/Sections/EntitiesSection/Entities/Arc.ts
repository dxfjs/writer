import { BoundingBox, boundingBox_t } from 'Internals/BoundingBox'
import Entity, { CommonEntityOptions } from '../Entity'
import { point3d, vec3_t } from 'Internals/Helpers'

import { Dxfier } from 'Internals/Dxfier'
import { deg2rad } from 'Internals/Utils'

export class Arc extends Entity {
  center: vec3_t
  radius: number
  startAngle: number
  endAngle: number

  get start(): vec3_t {
    const x = this.center.x + this.radius * Math.cos(deg2rad(this.startAngle))
    const y = this.center.y + this.radius * Math.sin(deg2rad(this.startAngle))
    return point3d(x, y)
  }

  get end(): vec3_t {
    const x = this.center.x + this.radius * Math.cos(deg2rad(this.endAngle))
    const y = this.center.y + this.radius * Math.sin(deg2rad(this.endAngle))
    return point3d(x, y)
  }

  constructor(
    center: vec3_t,
    radius: number,
    startAngle: number,
    endAngle: number,
    options?: CommonEntityOptions
  ) {
    super('ARC', 'AcDbCircle', options)
    this.center = center
    this.radius = radius
    this.startAngle = startAngle
    this.endAngle = endAngle
  }

  override boundingBox(): boundingBox_t {
    return BoundingBox.centerRadiusBBox(this.center, this.radius)
  }

  override dxfy(dx: Dxfier): void {
    super.dxfy(dx)
    dx.point3d(this.center)
    dx.push(40, this.radius)
    dx.subclassMarker('AcDbArc')
    dx.push(50, this.startAngle)
    dx.push(51, this.endAngle)
  }
}
