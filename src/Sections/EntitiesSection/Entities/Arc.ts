import Entity, { CommonEntityOptions } from '../Entity';
import BoundingBox, { boundingBox_t } from 'Internals/BoundingBox';
import { Dxifier } from 'Internals/Dxifier';
import { vec3_t } from 'Internals/Helpers';

export default class Arc extends Entity {
	center: vec3_t;
	radius: number;
	startAngle: number;
	endAngle: number;

	constructor(
		center: vec3_t,
		radius: number,
		startAngle: number,
		endAngle: number,
		options?: CommonEntityOptions
	) {
		super('ARC', 'AcDbCircle', options);
		this.center = center;
		this.radius = radius;
		this.startAngle = startAngle;
		this.endAngle = endAngle;
	}

	override boundingBox(): boundingBox_t {
		return BoundingBox.centerRadiusBBox(this.center, this.radius);
	}

	override dxify(dx: Dxifier): void {
		super.dxify(dx);
		dx.point3d(this.center);
		dx.push(40, this.radius);
		dx.subclassMarker('AcDbArc');
		dx.push(50, this.startAngle);
		dx.push(51, this.endAngle);
	}
}
