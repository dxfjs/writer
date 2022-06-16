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
		manager.push(super.manager.tags);
		manager.subclassMarker('AcDbBlockTableRecord');
		manager.name(this.name);
		manager.add(340, this.layoutObject);
		manager.add(70, this.insertionUnits);
		manager.add(280, this.explodability);
		manager.add(280, this.scalability);
		return manager;
	}
}
