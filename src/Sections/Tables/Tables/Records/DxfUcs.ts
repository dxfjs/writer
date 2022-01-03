import TagsManager, { tag_t } from '../../../../Internals/TagsManager';
import DxfRecord from './DxfRecord';

export default class DxfUcs extends DxfRecord {
	private readonly _name: string;

	public get name(): string {
		return this._name;
	}

	public constructor(name: string) {
		super('UCS');
		this._name = name;
	}

	public tags(): tag_t[] {
		const manager = new TagsManager();
		manager.pushTags(super.tags());
		return manager.tags;
	}
}
