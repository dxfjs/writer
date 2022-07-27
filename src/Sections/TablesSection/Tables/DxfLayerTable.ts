import DxfTable from '../DxfTable';
import DxfLayer from './Records/DxfLayer';
import TagsManager from '../../../Internals/TagsManager';
import DxfLTypeTable from './DxfLTypeTable';
import { LayerFlags } from './Records/DxfRecord';

export default class DxfLayerTable extends DxfTable {
	readonly layerRecords: DxfLayer[] = [];
	readonly lTypeTable: DxfLTypeTable;

	constructor(lineTypeTable: DxfLTypeTable) {
		super('LAYER');
		this.lTypeTable = lineTypeTable;
	}

	addLayer(
		name: string,
		color: number,
		lineType: string,
		flags?: LayerFlags
	) {
		if (this.exist(name))
			throw new Error(`The ${name} Layer already exist!`);
		if (!this.lTypeTable.exist(lineType))
			throw new Error(`The ${name} LineType doesn't exist!`);
		const layerRecord = new DxfLayer(name, color, lineType, flags);
		layerRecord.ownerObjectHandle = this.handle;
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
		manager.push(super.manager.tags);
		for (let i = 0; i < this.layerRecords.length; i++) {
			manager.append(this.layerRecords[i]);
		}
		manager.entityType('ENDTAB');
		return manager;
	}
}
