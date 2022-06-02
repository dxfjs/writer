import DxfTable from '../DxfTable';
import DxfView from './Records/DxfView';
import TagsManager from '../../../Internals/TagsManager';

export default class DxfViewTable extends DxfTable {
	static #instance: DxfViewTable;
	readonly viewRecords: DxfView[] = [];

	private constructor() {
		super('VIEW');
	}

	public static getInstance(): DxfViewTable {
		if (!this.#instance) this.#instance = new DxfViewTable();
		return this.#instance;
	}

	public addView(name: string): DxfView {
		const viewRecord = new DxfView(name);
		viewRecord.ownerObject = this.handle;
		this.viewRecords.push(viewRecord);
		return viewRecord;
	}

	public override get manager(): TagsManager {
		const manager = new TagsManager();
		this.maxNumberEntries = this.viewRecords.length;
		manager.pushTags(super.manager.tags);
		this.viewRecords.forEach((viewRecord) => {
			manager.appendTags(viewRecord);
		});
		manager.entityType('ENDTAB');
		return manager;
	}
}
