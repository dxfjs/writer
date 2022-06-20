import DxfTable from '../DxfTable';
import DxfView, { ViewArgs } from './Records/DxfView';
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

	public addView(args: ViewArgs): DxfView {
		const viewRecord = new DxfView(args);
		viewRecord.ownerObject = this.handle;
		this.viewRecords.push(viewRecord);
		return viewRecord;
	}

	public override get manager(): TagsManager {
		const manager = new TagsManager();
		this.maxNumberEntries = this.viewRecords.length;
		manager.push(super.manager.tags);
		this.viewRecords.forEach((viewRecord) => {
			manager.append(viewRecord);
		});
		manager.entityType('ENDTAB');
		return manager;
	}
}
