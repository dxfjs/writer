import TagsManager from '../../../../Internals/TagsManager';
import DxfRecord from './DxfRecord';

export enum AppIdFlags {
	None = 0,
	XRefDependent = 16,
	XRefResolved = 32,
}

export default class DxfAppId extends DxfRecord {
	name: string;
	flags: AppIdFlags;

	public constructor(name: string, flags?: AppIdFlags) {
		super('APPID');
		this.name = name;
		this.flags = flags ?? AppIdFlags.None;
	}

	override get manager(): TagsManager {
		const manager = new TagsManager();
		manager.push(super.manager.tags);
		manager.subclassMarker('AcDbRegAppTableRecord');
		manager.name(this.name);
		manager.add(70, this.flags);
		return manager;
	}
}
