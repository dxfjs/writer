import DxfTable from '../DxfTable';
import DxfLayer from './Records/DxfLayer';
import TagsManager from '../../../Internals/TagsManager';
import DxfLineTypeTable from './DxfLineTypeTable';

export default class DxfLayerTable extends DxfTable {
	private static _instance: DxfLayerTable;
	private readonly _layerRecords: DxfLayer[] = [];

	public get layerRecords(): DxfLayer[] {
		return this._layerRecords;
	}

	private constructor() {
		super('LAYER');
	}

	public static getInstance(): DxfLayerTable {
		if (!this._instance) this._instance = new DxfLayerTable();
		return this._instance;
	}

	public addLayer(
		name: string,
		color: number,
		lineType: string,
		flags?: number
	) {
		if (this.exist(name))
			throw new Error(`The ${name} Layer already exist!`);
		if (!DxfLineTypeTable.getInstance().exist(lineType))
			throw new Error(`The ${name} LineType doesn't exist!`);
		const layerRecord = new DxfLayer(name, color, lineType, flags);
		layerRecord.softPointer = this.handle;
		this.layerRecords.push(layerRecord);
		return layerRecord;
	}

	public exist(name: string) {
		return (
			this.layerRecords.find((layerRecord) => {
				return layerRecord.name === name;
			}) !== undefined
		);
	}

	public override get manager(): TagsManager {
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
