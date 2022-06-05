import Entity, { options_t } from '../Entity';
import TagsManager, { point3d } from '../../../Internals/TagsManager';
import BoundingBox, { boundingBox_t } from '../../../Internals/BoundingBox';

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

	override get manager(): TagsManager {
		const manager = new TagsManager();
		manager.pushTags(super.manager.tags);
		manager.point3d(point3d(this.x, this.y, this.z));
		return manager;
	}
}
