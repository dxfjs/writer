import TagsManager from '../../../../Internals/TagsManager';
import DxfRecord from './DxfRecord';

export const appIdFlags = {
	dependentOnXref: 16,
	xrefResolved: 32,
};

export default class DxfAppId extends DxfRecord {
	private readonly _name: string;
	private readonly _flags: number;

	public get name(): string {
		return this._name;
	}

	public get flags(): number {
		return this._flags;
	}

	public constructor(name: string, flags: number) {
		super('APPID');
		this._name = name;
		this._flags = flags;
	}

	public get manager(): TagsManager {
		const manager = new TagsManager();
		manager.pushTags(super.manager.tags);
		manager.subclassMarker('AcDbRegAppTableRecord');
		manager.name(this.name);
		manager.addTag(70, this.flags);
		return manager;
	}
}
