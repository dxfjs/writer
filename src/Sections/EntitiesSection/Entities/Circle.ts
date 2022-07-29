import Entity, { options_t } from '../Entity';
import BoundingBox, { boundingBox_t } from '../../../Internals/BoundingBox';
import { Dxifier, point3d_t } from '../../../Internals/Dxifier';

export default class Circle extends Entity {
	center: point3d_t;
	radius: number;

	constructor(center: point3d_t, radius: number, options?: options_t) {
		super('CIRCLE', 'AcDbCircle', options);
		this.center = center;
		this.radius = radius;
	}

	override boundingBox(): boundingBox_t {
		return BoundingBox.centerRadiusBBox(this.center, this.radius);
	}

	dxify(dx: Dxifier): void {
		super.dxify(dx);
		dx.point3d(this.center);
		dx.push(40, this.radius);
	}
}
