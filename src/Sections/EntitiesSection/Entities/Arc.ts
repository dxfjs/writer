import Entity, { options_t } from '../Entity';
import BoundingBox, { boundingBox_t } from '../../../Internals/BoundingBox';
import { Dxifier } from '../../../Internals/Dxifier';
import { point3d_t } from '../../../Internals/Utils';

export default class Arc extends Entity {
	center: point3d_t;
	radius: number;
	startAngle: number;
	endAngle: number;

	constructor(
		center: point3d_t,
		radius: number,
		startAngle: number,
		endAngle: number,
		options?: options_t
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
