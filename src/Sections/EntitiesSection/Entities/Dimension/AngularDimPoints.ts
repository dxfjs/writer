import { Dimension, DimensionOptions, DimensionType } from './Dimension'

import { Dxfier } from 'Internals/Dxfier'
import { vec3_t } from 'Internals/Helpers'

export class AngularDimPoints extends Dimension {
  constructor(
		public center: vec3_t,
		public first: vec3_t,
		public second: vec3_t,
		options?: DimensionOptions
  ) {
    super(options)
    this.dimensionType = DimensionType.Angular3Point
  }

  protected override rotate(): number {
    return 0
  }

  override dxfy(dx: Dxfier): void {
    super.dxfy(dx)
    dx.subclassMarker('AcDb3PointAngularDimension')
    dx.point3d(this.first, 3)
    dx.point3d(this.second, 4)
    dx.point3d(this.center, 5)
  }
}
