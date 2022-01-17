import TagsManager from '../../../../Internals/TagsManager';
import DxfRecord from './DxfRecord';

/**
 * @public
 */
export default class DxfBlockRecord extends DxfRecord {
	readonly name: string;
	insertionUnits: number = 0;
	explodability: number = 1;
	scalability: number = 0;

	public constructor(name: string) {
		super('BLOCK_RECORD');
		this.name = name;
	}

	public override get manager(): TagsManager {
		const manager = new TagsManager();
		manager.pushTags(super.manager.tags);
		manager.subclassMarker('AcDbBlockTableRecord');
		manager.name(this.name);
		manager.pushTag(this.hardPointerTag());
		manager.addTag(70, this.insertionUnits);
		manager.addTag(280, this.explodability);
		manager.addTag(280, this.scalability);
		return manager;
	}
}
