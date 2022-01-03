import TagsManager, { tag_t } from '../../../../Internals/TagsManager';
import DxfRecord from './DxfRecord';

export default class DxfAppId extends DxfRecord {
	get name(): string {
		return this._name;
	}
	private readonly _name: string;

	public constructor(name: string) {
		super('APPID');
		this._name = name;
	}

	tags(): tag_t[] {
		const manager = new TagsManager();
		manager.pushTags(super.tags());
		manager.subclassMarker('AcDbRegAppTableRecord');
		manager.name(this.name);
		manager.addTag(70, 0);
		return manager.tags;
	}
}
