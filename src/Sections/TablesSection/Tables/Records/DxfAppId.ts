import TagsManager from '../../../../Internals/TagsManager';
import DxfRecord from './DxfRecord';

/**
 * @public
 */
export default class DxfAppId extends DxfRecord {
	name: string;
	flags: number;

	public constructor(name: string, flags?: number) {
		super('APPID');
		this.name = name;
		this.flags = flags ?? 0;
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
