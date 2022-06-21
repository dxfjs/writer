import TagsManager from '../../../../Internals/TagsManager';
import DxfRecord, { LayerFlags } from './DxfRecord';

export default class DxfLayer extends DxfRecord {
	readonly name: string;
	colorNumber: number;
	lineType: string;
	flags: LayerFlags;
	materialObject?: string;

	constructor(
		name: string,
		color: number,
		lineType: string,
		flags?: LayerFlags
	) {
		super('LAYER');

		this.name = name;
		this.colorNumber = color;
		this.lineType = lineType;
		this.flags = flags ?? LayerFlags.None;
	}

	override get manager(): TagsManager {
		const manager = new TagsManager();
		manager.push(super.manager.tags);
		manager.subclassMarker('AcDbLayerTableRecord');
		manager.name(this.name);
		manager.add(70, this.flags);
		manager.colorNumber(this.colorNumber);
		manager.lineType(this.lineType);
		manager.add(370, 0); // TODO Refactor this to be dynamic
		manager.add(390, 0); // TODO Add ACDBPLACEHOLDER Object to support this
		manager.add(347, this.materialObject);
		return manager;
	}
}
