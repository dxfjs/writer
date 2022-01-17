import DxfTable from '../DxfTable';
import DxfStyle from './Records/DxfStyle';
import TagsManager from '../../../Internals/TagsManager';

export default class DxfStyleTable extends DxfTable {
	private static _instance: DxfStyleTable;
	private _styleRecords: DxfStyle[] = [];

	public get styleRecords(): DxfStyle[] {
		return this._styleRecords;
	}

	private constructor() {
		super('STYLE');
	}

	public static getInstance(): DxfStyleTable {
		if (!this._instance) this._instance = new DxfStyleTable();
		return this._instance;
	}

	public addStyle(name: string, flags?: number): DxfStyle {
		const styleRecord = new DxfStyle(name, flags);
		styleRecord.softPointer = this.handle;
		this._styleRecords.push(styleRecord);
		return styleRecord;
	}

	public override get manager(): TagsManager {
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
