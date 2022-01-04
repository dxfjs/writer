import DxfTable from '../DxfTable';
import DxfLayer from './Records/DxfLayer';
import TagsManager from '../../../Internals/TagsManager';

export default class DxfLayerTable extends DxfTable {
	private readonly _layerRecords: DxfLayer[] = [];

	get layerRecords(): DxfLayer[] {
		return this._layerRecords;
	}

	public constructor() {
		super('LAYER');
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
