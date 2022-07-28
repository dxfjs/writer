import { Dxifier } from '../../Internals/Dxifier';
import Handle from '../../Internals/Handle';
import DxfInterface from '../../Internals/Interfaces/DxfInterface';
import DxfRecord from './Tables/Records/DxfRecord';

export default abstract class DxfTable<T extends DxfRecord>
	implements DxfInterface
{
	maxNumberEntries = 0;
	readonly handle: string;
	ownerObjectHandle: string;
	records: T[];

	public constructor(public name: string) {
		this.ownerObjectHandle = '0';
		this.handle = Handle.next();
		this.records = [];
	}

	dxify(mg: Dxifier) {
		mg.type('TABLE');
		mg.name(this.name);
		mg.handle(this.handle);
		mg.push(330, this.ownerObjectHandle);
		mg.subclassMarker('AcDbSymbolTable');
		mg.push(70, this.records.length);
		for (const record of this.records) record.dxify(mg);
		mg.type('ENDTAB');
	}
}
