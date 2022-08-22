import Entity, { CommonEntityOptions } from '../Entity';
import BoundingBox, { boundingBox_t } from 'Internals/BoundingBox';
import { Dxifier } from 'Internals/Dxifier';
import { vec3_t } from 'Internals/Helpers';

export default class Circle extends Entity {
	center: vec3_t;
	radius: number;

	constructor(center: vec3_t, radius: number, options?: CommonEntityOptions) {
		super('CIRCLE', 'AcDbCircle', options);
		this.center = center;
		this.radius = radius;
	}

	override boundingBox(): boundingBox_t {
		return BoundingBox.centerRadiusBBox(this.center, this.radius);
	}

	override dxify(dx: Dxifier): void {
		super.dxify(dx);
		dx.point3d(this.center);
		dx.push(40, this.radius);
	}
}
