import DxfTable from '../DxfTable';
import DxfView from './Records/DxfView';
import TagsManager from '../../../Internals/TagsManager';

export default class DxfViewTable extends DxfTable {
	private static _instance: DxfViewTable;
	private _viewRecords: DxfView[] = [];

	public get viewRecords(): DxfView[] {
		return this._viewRecords;
	}

	private constructor() {
		super('VIEW');
	}

	public static getInstance(): DxfViewTable {
		if (!this._instance) this._instance = new DxfViewTable();
		return this._instance;
	}

	public addView(name: string) {
		const viewRecord = new DxfView(name);
		viewRecord.softPointer = this.handle;
		this._viewRecords.push();
	}

	public get manager(): TagsManager {
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
