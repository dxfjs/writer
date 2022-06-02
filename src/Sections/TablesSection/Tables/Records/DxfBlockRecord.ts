import TagsManager from '../../../../Internals/TagsManager';
import DxfRecord from './DxfRecord';

/**
 * @public
 */
export default class DxfBlockRecord extends DxfRecord {
	readonly name: string;
	insertionUnits = 0;
	explodability = 1;
	scalability = 0;
	layoutObject?: string;

	constructor(name: string) {
		super('BLOCK_RECORD');
		this.name = name;
	}

	override get manager(): TagsManager {
		const manager = new TagsManager();
		manager.pushTags(super.manager.tags);
		manager.subclassMarker('AcDbBlockTableRecord');
		manager.name(this.name);
		manager.addTag(340, this.layoutObject);
		manager.addTag(70, this.insertionUnits);
		manager.addTag(280, this.explodability);
		manager.addTag(280, this.scalability);
		return manager;
	}
}
