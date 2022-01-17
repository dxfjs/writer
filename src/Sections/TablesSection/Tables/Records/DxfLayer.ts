import TagsManager from '../../../../Internals/TagsManager';
import DxfRecord from './DxfRecord';

/**
 * @public
 */
export default class DxfLayer extends DxfRecord {
	readonly name: string;
	colorNumber: number;
	lineType: string;
	flags: number;

	public constructor(
		name: string,
		color: number,
		lineType: string,
		flags?: number
	) {
		super('LAYER');

		this.name = name;
		this.colorNumber = color;
		this.lineType = lineType;
		this.flags = flags ?? 0;
	}

	public override get manager(): TagsManager {
		const manager = new TagsManager();
		manager.pushTags(super.manager.tags);
		manager.subclassMarker('AcDbLayerTableRecord');
		manager.name(this.name);
		manager.addTag(70, this.flags);
		manager.colorNumber(this.colorNumber);
		manager.lineType(this.lineType);
		manager.addTag(370, 0); // TODO Refactor this to be dynamic
		manager.addTag(390, 0); // TODO Add ACDBPLACEHOLDER Object to support this
		manager.pushTag(this.hardPointerTag(7));
		return manager;
	}
}
