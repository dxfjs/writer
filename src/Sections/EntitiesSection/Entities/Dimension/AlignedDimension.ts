import { Dimension, DimensionOptions, DimensionType } from './Dimension'
import { ab, angle, b, xy } from 'Internals/Utils'

import { Dxfier } from 'Internals/Dxfier'
import { vec3_t } from 'Internals/Helpers'

export interface AlignedDimOptions extends DimensionOptions {
	insertionPoint?: vec3_t;
	offset?: number;
}

export class AlignedDimension extends Dimension {
  insertionPoint?: vec3_t
  fisrtPoint: vec3_t
  secondPoint: vec3_t
  constructor(first: vec3_t, second: vec3_t, options?: AlignedDimOptions) {
    super(options)
    this.dimensionType = DimensionType.Aligned
    this.insertionPoint = options?.insertionPoint
    this.fisrtPoint = first
    this.secondPoint = second
    this.offset(options?.offset)
  }

  private offset(v?: number) {
    if (v == null) return
    const [a_, b_] = ab(this.fisrtPoint, this.secondPoint)
    const _b = b(v, [a_, b_])
    this.definitionPoint = xy([a_, _b], this.fisrtPoint)
  }

  protected override  rotate(): number {
    return angle(this.fisrtPoint, this.secondPoint)
  }

  protected override dxfyChild(dx: Dxfier): void {
    dx.subclassMarker('AcDbAlignedDimension')
    dx.point3d(this.insertionPoint, 2)
    dx.point3d(this.fisrtPoint, 3)
    dx.point3d(this.secondPoint, 4)
  }
}
