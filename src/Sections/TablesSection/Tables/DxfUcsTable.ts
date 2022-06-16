import DxfTable from '../DxfTable';
import DxfUcs from './Records/DxfUcs';
import TagsManager from '../../../Internals/TagsManager';

export default class DxfUcsTable extends DxfTable {
	static #instance: DxfUcsTable;
	ucsRecords: DxfUcs[] = [];

	private constructor() {
		super('UCS');
	}

	public static getInstance(): DxfUcsTable {
		if (!this.#instance) this.#instance = new DxfUcsTable();
		return this.#instance;
	}

	public addUcs(name: string) {
		const ucsRecord = new DxfUcs(name);
		ucsRecord.ownerObject = this.handle;
		this.ucsRecords.push(ucsRecord);
		return ucsRecord;
	}

	public override get manager(): TagsManager {
		const manager = new TagsManager();
		this.maxNumberEntries = this.ucsRecords.length;
		manager.push(super.manager.tags);
		this.ucsRecords.forEach((ucsRecord) => {
			manager.append(ucsRecord);
		});
		manager.entityType('ENDTAB');
		return manager;
	}
}
