import DxfTable from '../DxfTable';
import BlockRecord from './Records/DxfBlockRecord';
import DxfBlockRecord from './Records/DxfBlockRecord';
import TagsManager from '../../../Internals/TagsManager';

export default class DxfBlockRecordTable extends DxfTable {
	private static _instance: DxfBlockRecordTable;
	private _blockRecords: BlockRecord[] = [];

	public get blockRecords(): BlockRecord[] {
		return this._blockRecords;
	}

	private constructor() {
		super('BLOCK_RECORD');
	}

	public static getInstance(): DxfBlockRecordTable {
		if (!this._instance) this._instance = new DxfBlockRecordTable();
		return this._instance;
	}

	public addBlockRecord(name: string) {
		const blockRecord = new DxfBlockRecord(name);
		blockRecord.ownerObject = this.handle;
		this._blockRecords.push(blockRecord);
		return blockRecord;
	}

	public override get manager(): TagsManager {
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
