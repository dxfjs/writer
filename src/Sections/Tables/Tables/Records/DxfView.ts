import TagsManager from '../../../../Internals/TagsManager';
import DxfRecord from './DxfRecord';

export default class DxfView extends DxfRecord {
	private readonly _name: string;

	public get name(): string {
		return this._name;
	}

	public constructor(name: string) {
		super('VIEW');
		this._name = name;
	}

	public get manager(): TagsManager {
		const manager = new TagsManager();
		manager.pushTags(super.manager.tags);
		return manager;
	}
}
