import DxfTable from '../DxfTable';
import DxfUcs from './Records/DxfUcs';
import TagsManager from '../../../Internals/TagsManager';

export default class DxfUcsTable extends DxfTable {
	private static _instance: DxfUcsTable;
	private _ucsRecords: DxfUcs[] = [];

	public get ucsRecords(): DxfUcs[] {
		return this._ucsRecords;
	}

	private constructor() {
		super('UCS');
	}

	public static getInstance(): DxfUcsTable {
		if (!this._instance) this._instance = new DxfUcsTable();
		return this._instance;
	}

	public addUcs(name: string) {
		const ucsRecord = new DxfUcs(name);
		ucsRecord.softPointer = this.handle;
		this._ucsRecords.push(ucsRecord);
		return ucsRecord;
	}

	public override get manager(): TagsManager {
		const manager = new TagsManager();
		this.maxNumberEntries = this.ucsRecords.length;
		manager.pushTags(super.manager.tags);
		this.ucsRecords.forEach((ucsRecord) => {
			manager.appendTags(ucsRecord);
		});
		manager.entityType('ENDTAB');
		return manager;
	}
}
