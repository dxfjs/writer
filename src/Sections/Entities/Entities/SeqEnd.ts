import BoundingBox, { boundingBox_t } from '../../../Internals/BoundingBox';
import TagsManager, { point3d } from '../../../Internals/TagsManager';
import Entity, { options_t } from '../Entity';

export default class SeqEnd extends Entity {
	public constructor(options: options_t) {
		super({ type: 'SEQEND', options });
	}

	public boundingBox(): boundingBox_t {
		return BoundingBox.pointBBox(point3d(0, 0, 0));
	}

	public get manager(): TagsManager {
		const manager = new TagsManager();
		manager.pushTags(super.manager.tags);
		return manager;
	}
}
