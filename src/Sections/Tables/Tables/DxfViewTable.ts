import DxfTable from '../DxfTable';
import DxfView from './Records/DxfView';
import TagsManager, { tag_t } from '../../../Internals/TagsManager';

export default class DxfViewTable extends DxfTable {
	private _viewRecords: DxfView[] = [];

	get viewRecords(): DxfView[] {
		return this._viewRecords;
	}

	public constructor() {
		super('VIEW');
	}

	public addView(name: string) {
		const viewRecord = new DxfView(name);
		viewRecord.softPointer = this.handle;
		this._viewRecords.push();
	}

	public tags(): tag_t[] {
		const manager = new TagsManager();
		this.maxNumberEntries = this.viewRecords.length;
		manager.pushTags(super.tags());
		this.viewRecords.forEach((viewRecord) => {
			manager.pushTags(viewRecord.tags());
		});
		manager.entityType('ENDTAB');
		return manager.tags;
	}
}
