import Entity, { options_t } from '../Entity';
import BoundingBox, { boundingBox_t } from '../../../Internals/BoundingBox';
import { Dxifier, point3d } from '../../../Internals/Dxifier';

export default class Point extends Entity {
	x: number;
	y: number;
	z: number;

	constructor(x: number, y: number, z: number, options?: options_t) {
		super('POINT', 'AcDbPoint', options);
		this.x = x;
		this.y = y;
		this.z = z;
	}

	override boundingBox(): boundingBox_t {
		return BoundingBox.pointBBox(point3d(this.x, this.y, this.z));
	}

	dxify(mg: Dxifier): void {
		super.dxify(mg);
		mg.point3d(point3d(this.x, this.y, this.z));
	}
}
