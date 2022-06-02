import DxfDimStyle from './Records/DxfDimStyle';
import TagsManager from '../../../Internals/TagsManager';
import DxfTable from '../DxfTable';

export default class DxfDimStyleTable extends DxfTable {
	static #instance: DxfDimStyleTable;
	readonly dimStyleRecords: DxfDimStyle[] = [];

	private constructor() {
		super('DIMSTYLE');
		this.ownerObject = '0';
	}

	static getInstance(): DxfDimStyleTable {
		if (!this.#instance) this.#instance = new DxfDimStyleTable();
		return this.#instance;
	}

	override get manager(): TagsManager {
		const manager = new TagsManager();
		this.maxNumberEntries = this.dimStyleRecords.length;
		manager.pushTags(super.manager.tags);
		this.dimStyleRecords.forEach((dimStyleRecord) => {
			manager.appendTags(dimStyleRecord);
		});
		manager.entityType('ENDTAB');
		return manager;
	}

	addDimStyle(name: string, flags?: number) {
		const dimStyle = new DxfDimStyle(name, flags);
		dimStyle.ownerObject = this.handle;
		this.dimStyleRecords.push(dimStyle);
		return dimStyle;
	}
}
