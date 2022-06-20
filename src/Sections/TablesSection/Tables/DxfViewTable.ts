import DxfTable from '../DxfTable';
import DxfView, { ViewArgs } from './Records/DxfView';
import TagsManager from '../../../Internals/TagsManager';

export default class DxfViewTable extends DxfTable {
	readonly viewRecords: DxfView[] = [];

	constructor() {
		super('VIEW');
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
		manager.pushTags(super.manager.tags);
		this.viewRecords.forEach((viewRecord) => {
			manager.appendTags(viewRecord);
		});
		manager.entityType('ENDTAB');
		return manager;
	}
}
