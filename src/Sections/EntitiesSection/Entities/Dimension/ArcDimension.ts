
import { Dimension, DimensionOptions } from './Dimension'

import { Dxfier } from 'Internals/Dxfier'
import { vec3_t } from 'Internals/Helpers'

export class ArcDimension extends Dimension {
  center: vec3_t
  startPoint: vec3_t
  endPoint: vec3_t
  startAngle: number
  endAngle: number
  isPartial: 1 | 0
  hasLeader: 1 | 0
  firstLeaderPoint?: vec3_t
  secondLeaderPoint?: vec3_t

  constructor(center: vec3_t, startPoint: vec3_t, endPoint: vec3_t, options?: DimensionOptions) {
    super(options)
    this.type = 'ARC_DIMENSION'
    this.center = center
    this.startPoint = startPoint
    this.endPoint = endPoint
    this.startAngle = 0
    this.endAngle = 0
    this.isPartial = 0
    this.hasLeader = 0
  }

  protected rotate(): number {
    return 0
  }

  protected override dxfyChild(dx: Dxfier) {
    dx.subclassMarker('AcDbArcDimension')

    dx.point3d(this.startPoint, 3)
    dx.point3d(this.endPoint, 4)
    dx.point3d(this.center, 5)

    dx.push(40, this.startAngle)
    dx.push(41, this.endAngle)

    dx.push(70, this.isPartial)
    dx.push(71, this.hasLeader)

    dx.point3d(this.firstLeaderPoint, 6)
    dx.point3d(this.secondLeaderPoint, 7)
  }
}
