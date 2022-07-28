import Entity, { options_t } from '../Entity';
import BoundingBox, { boundingBox_t } from '../../../Internals/BoundingBox';
import { Dxifier, point3d_t } from '../../../Internals/Dxifier';

export default class Ellipse extends Entity {
	center: point3d_t;
	endPointOfMajorAxis: point3d_t;
	ratioOfMinorAxisToMajorAxis: number;
	startParameter: number;
	endParameter: number;

	constructor(
		center: point3d_t,
		endPointOfMajorAxis: point3d_t,
		ratioOfMinorAxisToMajorAxis: number,
		startParameter: number,
		endParameter: number,
		options?: options_t
	) {
		super('ELLIPSE', 'AcDbEllipse', options);
		this.center = center;
		this.endPointOfMajorAxis = endPointOfMajorAxis;
		this.ratioOfMinorAxisToMajorAxis = ratioOfMinorAxisToMajorAxis;
		this.startParameter = startParameter;
		this.endParameter = endParameter;
	}

	override boundingBox(): boundingBox_t {
		const x = this.center.x;
		const y = this.center.y;
		const xEndPointOfMajorAxis = this.endPointOfMajorAxis.x;
		const yEndPointOfMajorAxis = this.endPointOfMajorAxis.y;

		const bigRadius = Math.sqrt(
			Math.pow(x - (x + xEndPointOfMajorAxis), 2) +
				Math.pow(y - (y + yEndPointOfMajorAxis), 2)
		);
		return BoundingBox.centerRadiusBBox(this.center, bigRadius);
	}

	dxify(mg: Dxifier): void {
		super.dxify(mg);
		mg.point3d(this.center);
		mg.point3d(this.endPointOfMajorAxis, 1);
		mg.push(40, this.ratioOfMinorAxisToMajorAxis);
		mg.push(41, this.startParameter);
		mg.push(42, this.endParameter);
	}
}
