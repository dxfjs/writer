import BoundingBox, { boundingBox_t } from '../../../Internals/BoundingBox';
import TagsManager, { point3d } from '../../../Internals/TagsManager';
import Entity from '../Entity';

export default class SeqEnd extends Entity {
	public constructor() {
		super('SEQEND');
	}

	public boundingBox(): boundingBox_t {
		return BoundingBox.pointBBox(point3d(0, 0, 0));
	}

	public override get manager(): TagsManager {
		const manager = new TagsManager();
		manager.pushTags(super.manager.tags);
		return manager;
	}
}
