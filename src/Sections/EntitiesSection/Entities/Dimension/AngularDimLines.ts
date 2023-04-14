import { Dimension, DimensionOptions, DimensionType } from './Dimension'

import { Dxfier } from 'Internals/Dxfier'
import { vec3_t } from 'Internals/Helpers'

export interface DLine {
	start: vec3_t;
	end: vec3_t;
}

export class AngularDimLines extends Dimension {

  constructor(
		public first: DLine,
		public second: DLine,
		public location: vec3_t,
		options?: DimensionOptions
  ) {
    super(options)
    this.dimensionType = DimensionType.Angular
  }

  protected override rotate(): number {
    return 0
  }

  private _update() {
    this.definitionPoint = this.second.end
  }

  protected override dxfyChild(dx: Dxfier): void {
    this._update()
    dx.subclassMarker('AcDb2LineAngularDimension')
    dx.point3d(this.first.start, 3)
    dx.point3d(this.first.end, 4)
    dx.point3d(this.second.start, 5)
    dx.point3d(this.location, 6)
  }
}
