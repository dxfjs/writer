import DxfTable from '../DxfTable';
import DxfLayer from './Records/DxfLayer';
import TagsManager, { tag_t } from '../../../Internals/TagsManager';

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
		layerRecord.addSoftPointer(this.handle);
		this._layerRecords.push(layerRecord);
		return layerRecord;
	}

	public tags(): tag_t[] {
		const manager = new TagsManager();
		this.maxNumberEntries = this.layerRecords.length;
		manager.pushTags(super.tags());
		this.layerRecords.forEach((layerRecord) => {
			manager.pushTags(layerRecord.tags());
		});
		manager.entityType('ENDTAB');
		return manager.tags;
	}
}
