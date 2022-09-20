import { vec3_t } from 'Internals/Helpers';
import { Dxfier } from 'Internals/Dxfier';
import { Dimension, DimensionOptions, DimensionType } from './Dimension';

export class AngularDimPoints extends Dimension {
	constructor(
		public center: vec3_t,
		public first: vec3_t,
		public second: vec3_t,
		options?: DimensionOptions
	) {
		super(options);
		this.dimensionType = DimensionType.Angular3Point;
	}

	override dxfy(dx: Dxfier): void {
		super.dxfy(dx);
		dx.subclassMarker('AcDb3PointAngularDimension');
		dx.push(13, this.first.x);
		dx.push(23, this.first.y);
		dx.push(33, this.first.z);
		dx.push(14, this.second.x);
		dx.push(24, this.second.y);
		dx.push(34, this.second.z);
		dx.push(15, this.center.x);
		dx.push(25, this.center.y);
		dx.push(35, this.center.z);
	}
}
