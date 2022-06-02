import TagsManager from '../../../../Internals/TagsManager';
import DxfRecord from './DxfRecord';

export default class DxfUcs extends DxfRecord {
	readonly name: string;

	constructor(name: string) {
		super('UCS');
		this.name = name;
	}

	override get manager(): TagsManager {
		const manager = new TagsManager();
		manager.pushTags(super.manager.tags);
		return manager;
	}
}
