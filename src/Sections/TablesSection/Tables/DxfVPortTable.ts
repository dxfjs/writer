import DxfTable from '../DxfTable';
import DxfVPort from './Records/DxfVPort';
import TagsManager from '../../../Internals/TagsManager';

export default class DxfVPortTable extends DxfTable {
	readonly viewPortRecords: DxfVPort[] = [];

	constructor() {
		super('VPORT');
	}

	addViewPort(name: string) {
		const viewPortRecord = new DxfVPort(name);
		viewPortRecord.ownerObjectHandle = this.handle;
		this.viewPortRecords.push(viewPortRecord);
		return viewPortRecord;
	}

	override get manager(): TagsManager {
		const manager = new TagsManager();
		this.maxNumberEntries = this.viewPortRecords.length;
		manager.push(super.manager.tags);
		this.viewPortRecords.forEach((viewPortRecord) => {
			manager.append(viewPortRecord);
		});
		manager.entityType('ENDTAB');
		return manager;
	}
}
