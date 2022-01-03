import DxfTable from '../DxfTable';
import DxfUcs from './Records/DxfUcs';
import TagsManager, { tag_t } from '../../../Internals/TagsManager';

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
		ucsRecord.addSoftPointer(this.handle);
		this._ucsRecords.push(ucsRecord);
		return ucsRecord;
	}

	public tags(): tag_t[] {
		const manager = new TagsManager();
		this.maxNumberEntries = this.ucsRecords.length;
		manager.pushTags(super.tags());
		this.ucsRecords.forEach((ucsRecord) => {
			manager.pushTags(ucsRecord.tags());
		});
		manager.entityType('ENDTAB');
		return manager.tags;
	}
}
