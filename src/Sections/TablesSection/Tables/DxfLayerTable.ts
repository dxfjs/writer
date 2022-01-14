import DxfTable from '../DxfTable';
import DxfLayer from './Records/DxfLayer';
import TagsManager from '../../../Internals/TagsManager';

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

	public addLayer(name: string, color: number, lineType: string) {
		const layerRecord = new DxfLayer(name, color, lineType);
		layerRecord.softPointer = this.handle;
		this._layerRecords.push(layerRecord);
		return layerRecord;
	}

	public get manager(): TagsManager {
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
