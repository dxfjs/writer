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
		viewRecord.ownerObjectHandle = this.handle;
		this.viewRecords.push(viewRecord);
		return viewRecord;
	}

	public override get manager(): TagsManager {
		const manager = new TagsManager();
		this.maxNumberEntries = this.viewRecords.length;
		manager.push(super.manager.tags);
		for (let i = 0; i < this.viewRecords.length; i++) {
			manager.append(this.viewRecords[i]);
		}
		manager.entityType('ENDTAB');
		return manager;
	}
}
