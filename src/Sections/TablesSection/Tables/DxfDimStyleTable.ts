import DxfDimStyle from './Records/DxfDimStyle';
import TagsManager from '../../../Internals/TagsManager';
import DxfTable from '../DxfTable';

export default class DxfDimStyleTable extends DxfTable {
	private static _instance: DxfDimStyleTable;
	private readonly _dimStyleRecords: DxfDimStyle[] = [];

	public get dimStylesRecords(): DxfDimStyle[] {
		return this._dimStyleRecords;
	}

	private constructor() {
		super('DIMSTYLE');
		this.softPointer = '0';
	}

	public static getInstance(): DxfDimStyleTable {
		if (!this._instance) this._instance = new DxfDimStyleTable();
		return this._instance;
	}

	public stringify(): string {
		return this.manager.stringify();
	}

	public get manager(): TagsManager {
		const manager = new TagsManager();
		this.maxNumberEntries = this.dimStylesRecords.length;
		manager.pushTags(super.manager.tags);
		this.dimStylesRecords.forEach((dimStyleRecord) => {
			manager.appendTags(dimStyleRecord);
		});
		manager.entityType('ENDTAB');
		return manager;
	}

	public addDimStyle(name: string) {
		const dimStyle = new DxfDimStyle(name);
		dimStyle.softPointer = this.handle;
		this._dimStyleRecords.push(dimStyle);
		return dimStyle;
	}
}
