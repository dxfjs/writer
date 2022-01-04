import DxfTable from '../DxfTable';
import BlockRecord from './Records/DxfBlockRecord';
import DxfBlockRecord from './Records/DxfBlockRecord';
import TagsManager, { tag_t } from '../../../Internals/TagsManager';

export default class DxfBlockRecordTable extends DxfTable {
	private _blockRecords: BlockRecord[] = [];

	get blockRecords(): BlockRecord[] {
		return this._blockRecords;
	}

	public constructor() {
		super('BLOCK_RECORD');
		// this.addBlockRecord('*Model_Space');
		// this.addBlockRecord('*Paper_Space');
	}

	public addBlockRecord(name: string) {
		const blockRecord = new DxfBlockRecord(name);
		blockRecord.softPointer = this.handle;
		this._blockRecords.push(blockRecord);
		return blockRecord;
	}

	public tags(): tag_t[] {
		const manager = new TagsManager();
		this.maxNumberEntries = this.blockRecords.length;
		manager.pushTags(super.tags());
		this.blockRecords.forEach((blockRecord) => {
			manager.pushTags(blockRecord.tags());
		});
		manager.entityType('ENDTAB');
		return manager.tags;
	}
}
