import DxfObject from '../DxfObject';
import { Dxifier } from '../../../Internals/Dxifier';

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

	dxify(dx: Dxifier): void {
		super.dxify(dx);
		dx.subclassMarker('AcDbDictionary');
		dx.push(280, this.hardOwnerFlag);
		dx.push(281, this.duplicateRecordCloningFlag);
		for (const entry of this.entries) {
			dx.push(3, entry.name);
			dx.push(350, entry.entryObjectHandle);
		}
	}
}
