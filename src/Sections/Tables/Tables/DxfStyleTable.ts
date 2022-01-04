import DxfTable from '../DxfTable';
import DxfStyle from './Records/DxfStyle';
import TagsManager from '../../../Internals/TagsManager';

export default class DxfStyleTable extends DxfTable {
	private _styleRecords: DxfStyle[] = [];

	get styleRecords(): DxfStyle[] {
		return this._styleRecords;
	}

	public constructor() {
		super('STYLE');
	}

	public addStyle(name: string) {
		const styleRecord = new DxfStyle(name);
		styleRecord.softPointer = this.handle;
		this._styleRecords.push(styleRecord);
	}

	public get manager(): TagsManager {
		const manager = new TagsManager();
		this.maxNumberEntries = this.styleRecords.length;
		manager.pushTags(super.manager.tags);
		this.styleRecords.forEach((styleRecord) => {
			manager.appendTags(styleRecord);
		});
		manager.entityType('ENDTAB');
		return manager;
	}
}
