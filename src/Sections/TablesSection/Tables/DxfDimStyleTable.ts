import DxfDimStyle, { DimStyleFlags } from './Records/DxfDimStyle';
import DxfTable from '../DxfTable';
import { Dxifier } from 'Internals/Dxifier';

export default class DxfDimStyleTable extends DxfTable<DxfDimStyle> {
	constructor() {
		super('DIMSTYLE');
		this.ownerObjectHandle = '0';
	}

	addDimStyle(name: string, flags?: DimStyleFlags) {
		const r = new DxfDimStyle(name, flags);
		r.ownerObjectHandle = this.handle;
		this.records.push(r);
		return r;
	}

	override dxify(dx: Dxifier) {
		dx.type('TABLE');
		dx.name(this.name);
		dx.handle(this.handle);
		dx.push(330, this.ownerObjectHandle);
		dx.subclassMarker('AcDbSymbolTable');
		dx.push(70, this.records.length);
		dx.subclassMarker('AcDbDimStyleTable');
		for (const record of this.records) record.dxify(dx);
		dx.type('ENDTAB');
	}
}
