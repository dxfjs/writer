import DxfObject from '../DxfObject';
import TagsManager from '../../../Internals/TagsManager';

export type entryObject_t = {
	name: string;
	entryObjectHandle: string;
};

export default class DxfDictionary extends DxfObject {
	readonly entries: entryObject_t[] = [];

	hardOwnerFlag?: number;
	duplicateRecordCloningFlag: number;

	constructor() {
		super('DICTIONARY');
		this.duplicateRecordCloningFlag = 0;
	}

	addEntryObject(name: string, entryObjectHandle: string) {
		this.entries.push({
			name,
			entryObjectHandle: entryObjectHandle,
		});
	}

	override get manager(): TagsManager {
		const manager = new TagsManager();
		manager.push(super.manager.tags);
		manager.subclassMarker('AcDbDictionary');
		manager.add(280, this.hardOwnerFlag);
		manager.add(281, this.duplicateRecordCloningFlag);
		for (let i = 0; i < this.entries.length; i++) {
			const _entry = this.entries[i];
			manager.add(3, _entry.name);
			manager.add(350, _entry.entryObjectHandle);
		}
		return manager;
	}
}
