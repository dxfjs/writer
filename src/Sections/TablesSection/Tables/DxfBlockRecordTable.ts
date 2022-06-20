import DxfTable from '../DxfTable';
import BlockRecord from './Records/DxfBlockRecord';
import DxfBlockRecord from './Records/DxfBlockRecord';
import TagsManager from '../../../Internals/TagsManager';

export default class DxfBlockRecordTable extends DxfTable {
	readonly blockRecords: BlockRecord[] = [];

	constructor() {
		super('BLOCK_RECORD');
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
		manager.push(super.manager.tags);
		this.blockRecords.forEach((blockRecord) => {
			manager.append(blockRecord);
		});
		manager.entityType('ENDTAB');
		return manager;
	}
}
