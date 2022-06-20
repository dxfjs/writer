import DxfTable from '../DxfTable';
import DxfLayer from './Records/DxfLayer';
import TagsManager from '../../../Internals/TagsManager';
import DxfLineTypeTable from './DxfLineTypeTable';

export default class DxfLayerTable extends DxfTable {
	readonly layerRecords: DxfLayer[] = [];
	readonly lineTypeTable: DxfLineTypeTable

	constructor(lineTypeTable: DxfLineTypeTable) {
		super('LAYER');
		this.lineTypeTable = lineTypeTable
	}

	addLayer(name: string, color: number, lineType: string, flags?: number) {
		if (this.exist(name))
			throw new Error(`The ${name} Layer already exist!`);
		if (!this.lineTypeTable.exist(lineType))
			throw new Error(`The ${name} LineType doesn't exist!`);
		const layerRecord = new DxfLayer(name, color, lineType, flags);
		layerRecord.ownerObject = this.handle;
		this.layerRecords.push(layerRecord);
		return layerRecord;
	}

	exist(name: string) {
		return (
			this.layerRecords.find((layerRecord) => {
				return layerRecord.name === name;
			}) !== undefined
		);
	}

	override get manager(): TagsManager {
		const manager = new TagsManager();
		this.maxNumberEntries = this.layerRecords.length;
		manager.pushTags(super.manager.tags);
		this.layerRecords.forEach((layerRecord) => {
			manager.appendTags(layerRecord);
		});
		manager.entityType('ENDTAB');
		return manager;
	}
}
