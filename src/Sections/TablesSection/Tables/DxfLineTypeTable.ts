import DxfTable from '../DxfTable';
import DxfLineType from './Records/DxfLineType';
import TagsManager from '../../../Internals/TagsManager';

export default class DxfLineTypeTable extends DxfTable {
	private static _instance: DxfLineTypeTable;
	private readonly _lineTypeRecords: DxfLineType[] = [];

	public get lineTypeRecords(): DxfLineType[] {
		return this._lineTypeRecords;
	}

	private constructor() {
		super('LTYPE');
	}

	public static getInstance(): DxfLineTypeTable {
		if (!this._instance) this._instance = new DxfLineTypeTable();
		return this._instance;
	}

	public exist(name: string): boolean {
		return (
			this.lineTypeRecords.find((lineTypeRecord) => {
				return lineTypeRecord.name === name;
			}) !== undefined
		);
	}

	public addLineType(name: string, descriptive: string, elements: number[]) {
		const foundLineTypeRecord = this._lineTypeRecords.find(
			(lineTypeRecord) => lineTypeRecord.name === name
		);
		if (foundLineTypeRecord)
			throw new Error(`The ${name} LineType name already exist!`);
		const lineTypeRecord = new DxfLineType(name, descriptive, elements);
		lineTypeRecord.softPointer = this.handle;
		this._lineTypeRecords.push(lineTypeRecord);
		return lineTypeRecord;
	}

	public get manager(): TagsManager {
		const manager = new TagsManager();
		this.maxNumberEntries = this.lineTypeRecords.length;
		manager.pushTags(super.manager.tags);
		this.lineTypeRecords.forEach((lineTypeRecord) => {
			manager.appendTags(lineTypeRecord);
		});
		manager.entityType('ENDTAB');
		return manager;
	}
}
