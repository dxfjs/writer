import DxfTable from '../DxfTable';
import DxfStyle from './Records/DxfStyle';
import TagsManager from '../../../Internals/TagsManager';

export default class DxfStyleTable extends DxfTable {
	static #instance: DxfStyleTable;
	styleRecords: DxfStyle[] = [];

	private constructor() {
		super('STYLE');
	}

	static getInstance(): DxfStyleTable {
		if (!this.#instance) this.#instance = new DxfStyleTable();
		return this.#instance;
	}

	addStyle(name: string, flags?: number): DxfStyle {
		const styleRecord = new DxfStyle(name, flags);
		styleRecord.ownerObject = this.handle;
		this.styleRecords.push(styleRecord);
		return styleRecord;
	}

	override get manager(): TagsManager {
		const manager = new TagsManager();
		this.maxNumberEntries = this.styleRecords.length;
		manager.push(super.manager.tags);
		this.styleRecords.forEach((styleRecord) => {
			manager.append(styleRecord);
		});
		manager.entityType('ENDTAB');
		return manager;
	}
}
