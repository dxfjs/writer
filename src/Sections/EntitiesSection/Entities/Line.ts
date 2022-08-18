import Entity, { options_t } from '../Entity';
import BoundingBox, { boundingBox_t } from '../../../Internals/BoundingBox';
import { Dxifier } from '../../../Internals/Dxifier';
import { vec3_t } from '../../../Internals/Helpers';

export default class Line extends Entity {
	startPoint: vec3_t;
	endPoint: vec3_t;

	constructor(startPoint: vec3_t, endPoint: vec3_t, options?: options_t) {
		super('LINE', 'AcDbLine', options);
		this.startPoint = startPoint;
		this.endPoint = endPoint;
	}

	override boundingBox(): boundingBox_t {
		return BoundingBox.lineBBox(this.startPoint, this.endPoint);
	}

	override dxify(dx: Dxifier): void {
		super.dxify(dx);
		dx.point3d(this.startPoint);
		dx.push(11, this.endPoint.x);
		dx.push(21, this.endPoint.y);
		dx.push(31, this.endPoint.z);
	}
}
