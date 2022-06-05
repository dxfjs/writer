import TagsManager from '../../../Internals/TagsManager';
import Entity from '../Entity';

export default class SeqEnd extends Entity {
	public constructor() {
		super('SEQEND');
	}

	public override get manager(): TagsManager {
		const manager = new TagsManager();
		manager.pushTags(super.manager.tags);
		return manager;
	}
}
