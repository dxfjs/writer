import DxfTable from '../DxfTable';
import BlockRecord from './Records/DxfBlockRecord';
import DxfBlockRecord from './Records/DxfBlockRecord';
import TagsManager from '../../../Internals/TagsManager';

export default class DxfBlockRecordTable extends DxfTable {
	static #instance: DxfBlockRecordTable;
	readonly blockRecords: BlockRecord[] = [];

	private constructor() {
		super('BLOCK_RECORD');
	}

	static getInstance(): DxfBlockRecordTable {
		if (!this.#instance) this.#instance = new DxfBlockRecordTable();
		return this.#instance;
	}

	addBlockRecord(name: string) {
		const blockRecord = new DxfBlockRecord(name);
		blockRecord.ownerObject = this.handle;
		this.blockRecords.push(blockRecord);
		return blockRecord;
	}

	override get manager(): TagsManager {
		const manager = new TagsManager();
		this.maxNumberEntries = this.blockRecords.length;
		manager.pushTags(super.manager.tags);
		this.blockRecords.forEach((blockRecord) => {
			manager.appendTags(blockRecord);
		});
		manager.entityType('ENDTAB');
		return manager;
	}
}
