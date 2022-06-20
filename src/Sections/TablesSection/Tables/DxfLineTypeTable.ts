import DxfTable from '../DxfTable';
import DxfLineType from './Records/DxfLineType';
import TagsManager from '../../../Internals/TagsManager';

export default class DxfLineTypeTable extends DxfTable {
	readonly lineTypeRecords: DxfLineType[] = [];

	constructor() {
		super('LTYPE');
	}

	exist(name: string): boolean {
		return (
			this.lineTypeRecords.find((lineTypeRecord) => {
				return lineTypeRecord.name === name;
			}) !== undefined
		);
	}

	addLineType(
		name: string,
		descriptive: string,
		elements: number[],
		flags?: number
	) {
		if (this.exist(name))
			throw new Error(`The ${name} LineType already exist!`);
		const lineTypeRecord = new DxfLineType(
			name,
			descriptive,
			elements,
			flags
		);
		lineTypeRecord.ownerObject = this.handle;
		this.lineTypeRecords.push(lineTypeRecord);
		return lineTypeRecord;
	}

	override get manager(): TagsManager {
		const manager = new TagsManager();
		this.maxNumberEntries = this.lineTypeRecords.length;
		manager.push(super.manager.tags);
		this.lineTypeRecords.forEach((lineTypeRecord) => {
			manager.append(lineTypeRecord);
		});
		manager.entityType('ENDTAB');
		return manager;
	}
}
