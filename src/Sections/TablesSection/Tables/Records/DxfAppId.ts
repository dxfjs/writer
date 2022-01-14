import TagsManager from '../../../../Internals/TagsManager';
import DxfRecord from './DxfRecord';

export default class DxfAppId extends DxfRecord {
	private readonly _name: string;

	public get name(): string {
		return this._name;
	}

	public constructor(name: string) {
		super('APPID');
		this._name = name;
	}

	public get manager(): TagsManager {
		const manager = new TagsManager();
		manager.pushTags(super.manager.tags);
		manager.subclassMarker('AcDbRegAppTableRecord');
		manager.name(this.name);
		manager.addTag(70, 0);
		return manager;
	}
}
