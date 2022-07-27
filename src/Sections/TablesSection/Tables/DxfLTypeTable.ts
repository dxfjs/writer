import DxfTable from '../DxfTable';
import DxfLType from './Records/DxfLType';
import TagsManager from '../../../Internals/TagsManager';

export default class DxfLTypeTable extends DxfTable {
	readonly lTypeRecords: DxfLType[] = [];

	constructor() {
		super('LTYPE');
	}

	exist(name: string): boolean {
		return (
			this.lTypeRecords.find((lineTypeRecord) => {
				return lineTypeRecord.name === name;
			}) !== undefined
		);
	}

	addLType(
		name: string,
		descriptive: string,
		elements: number[],
		flags?: number
	) {
		if (this.exist(name))
			throw new Error(`The ${name} LType already exist!`);
		const lTypeRecord = new DxfLType(name, descriptive, elements, flags);
		lTypeRecord.ownerObjectHandle = this.handle;
		this.lTypeRecords.push(lTypeRecord);
		return lTypeRecord;
	}

	override get manager(): TagsManager {
		const manager = new TagsManager();
		this.maxNumberEntries = this.lTypeRecords.length;
		manager.push(super.manager.tags);
		for (let i = 0; i < this.lTypeRecords.length; i++) {
			manager.append(this.lTypeRecords[i]);
		}
		manager.entityType('ENDTAB');
		return manager;
	}
}
