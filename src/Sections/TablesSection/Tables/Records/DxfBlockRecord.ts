import TagsManager from '../../../../Internals/TagsManager';
import DxfRecord from './DxfRecord';

export default class DxfBlockRecord extends DxfRecord {
	readonly name: string;
	insertionUnits: number;
	explodability: number;
	scalability: number;
	layoutObject?: string;

	constructor(name: string) {
		super('BLOCK_RECORD');
		this.name = name;
		this.insertionUnits = 0;
		this.explodability = 1;
		this.scalability = 0;
	}

	override get manager(): TagsManager {
		const manager = new TagsManager();
		manager.push(super.manager.tags);
		manager.subclassMarker('AcDbBlockTableRecord');
		manager.name(this.name);
		manager.add(340, this.layoutObject);
		manager.add(70, this.insertionUnits);
		manager.add(280, this.explodability);
		manager.add(281, this.scalability);
		return manager;
	}
}
