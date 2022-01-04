import DxfTable from '../DxfTable';
import DxfUcs from './Records/DxfUcs';
import TagsManager from '../../../Internals/TagsManager';

export default class DxfUcsTable extends DxfTable {
	private _ucsRecords: DxfUcs[] = [];

	get ucsRecords(): DxfUcs[] {
		return this._ucsRecords;
	}

	public constructor() {
		super('UCS');
	}

	public addUcs(name: string) {
		const ucsRecord = new DxfUcs(name);
		ucsRecord.softPointer = this.handle;
		this._ucsRecords.push(ucsRecord);
		return ucsRecord;
	}

	public get manager(): TagsManager {
		const manager = new TagsManager();
		this.maxNumberEntries = this.ucsRecords.length;
		manager.pushTags(super.manager.tags);
		this.ucsRecords.forEach((ucsRecord) => {
			manager.appendTags(ucsRecord);
		});
		manager.entityType('ENDTAB');
		return manager;
	}
}
