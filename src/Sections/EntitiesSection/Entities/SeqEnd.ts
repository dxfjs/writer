import TagsManager from '../../../Internals/TagsManager';
import Entity from '../Entity';

export default class SeqEnd extends Entity {
	constructor() {
		super('SEQEND');
	}

	override get manager(): TagsManager {
		const manager = new TagsManager();
		manager.push(super.manager.tags);
		return manager;
	}
}
