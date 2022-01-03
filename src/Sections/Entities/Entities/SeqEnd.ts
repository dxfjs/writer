import TagsManager, { tag_t } from '../../../Internals/TagsManager';
import Entity from '../Entity';

export default class SeqEnd extends Entity {
	public constructor() {
		super('SEQEND');
	}

	public tags(): tag_t[] {
		const manager = new TagsManager();
		manager.pushTags(super.tags());
		return manager.tags;
	}
}
