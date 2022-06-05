import Entity, { options_t } from '../Entity';
import TagsManager, { point3d_t } from '../../../Internals/TagsManager';
import BoundingBox, { boundingBox_t } from '../../../Internals/BoundingBox';

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

	override get manager(): TagsManager {
		const manager = new TagsManager();
		manager.pushTags(super.manager.tags);
		manager.point3d(this.startPoint);
		manager.point3d(this.endPoint, 1);
		return manager;
	}
}
