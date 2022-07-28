import Entity, { options_t } from '../Entity';
import BoundingBox, { boundingBox_t } from '../../../Internals/BoundingBox';
import { Dxifier, point3d_t } from '../../../Internals/Dxifier';

export default class Line extends Entity {
	startPoint: point3d_t;
	endPoint: point3d_t;

	constructor(
		startPoint: point3d_t,
		endPoint: point3d_t,
		options?: options_t
	) {
		super('LINE', 'AcDbLine', options);
		this.startPoint = startPoint;
		this.endPoint = endPoint;
	}

	override boundingBox(): boundingBox_t {
		return BoundingBox.lineBBox(this.startPoint, this.endPoint);
	}

	dxify(mg: Dxifier): void {
		super.dxify(mg);
		mg.point3d(this.startPoint);
		mg.point3d(this.endPoint, 1);
	}
}
