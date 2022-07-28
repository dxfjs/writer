import Entity, { options_t } from '../Entity';
import BoundingBox, { boundingBox_t } from '../../../Internals/BoundingBox';
import { Dxifier, point3d_t } from '../../../Internals/Dxifier';

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

	dxify(mg: Dxifier): void {
		super.dxify(mg);
		mg.point3d(this.center);
		mg.push(40, this.radius);
		mg.subclassMarker('AcDbArc');
		mg.push(50, this.startAngle);
		mg.push(51, this.endAngle);
	}
}
