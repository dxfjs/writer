import { Dimension, DimensionOptions, DimensionType } from './Dimension'
import { point3d, vec3_t } from 'Internals/Helpers'
import { Dxfier } from 'Internals/Dxfier'
import { deg2rad } from 'Internals/Utils'

export interface LinearDimOptions extends DimensionOptions {
	insertionPoint?: vec3_t;
	offset?: number;
	angle?: number;
	linearType?: number;
}

export class LinearDimension extends Dimension {
  insertionPoint?: vec3_t
  fisrtPoint: vec3_t
  secondPoint: vec3_t
  angle: number
  linearType?: number
  constructor(first: vec3_t, second: vec3_t, options?: LinearDimOptions) {
    super(options)
    this.dimensionType = DimensionType.Default
    this.insertionPoint = options?.insertionPoint
    this.fisrtPoint = first
    this.secondPoint = second
    this.angle = options?.angle ?? 0
    this.linearType = options?.linearType
    this.offset(options?.offset)
  }

  private offset(v?: number) {
    if (v == null) return
    const radAngle = deg2rad(this.angle)
    const x = this.fisrtPoint.x + v * Math.floor(Math.sin(radAngle))
    const y = this.fisrtPoint.y + v * Math.floor(Math.cos(radAngle))
    this.definitionPoint = point3d(x, y, 0)
  }

  protected override rotate(): number {
    return this.angle
  }

  override dxfy(dx: Dxfier): void {
    super.dxfy(dx)
    dx.subclassMarker('AcDbAlignedDimension')
    dx.point3d(this.insertionPoint, 2)
    dx.point3d(this.fisrtPoint, 3)
    dx.point3d(this.secondPoint, 4)
    dx.push(50, this.angle)
    dx.push(52, this.linearType)
    dx.subclassMarker('AcDbRotatedDimension')
  }
}
