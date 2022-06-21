import DxfTable from '../DxfTable';
import DxfUcs from './Records/DxfUcs';
import TagsManager from '../../../Internals/TagsManager';

export default class DxfUcsTable extends DxfTable {
	readonly ucsRecords: DxfUcs[] = [];

	constructor() {
		super('UCS');
	}

	addUcs(name: string) {
		const ucsRecord = new DxfUcs(name);
		ucsRecord.ownerObjectHandle = this.handle;
		this.ucsRecords.push(ucsRecord);
		return ucsRecord;
	}

	override get manager(): TagsManager {
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
