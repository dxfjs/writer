import { Dxifier } from '../../../../Internals/Dxifier';
import DxfRecord from './DxfRecord';

export default class DxfBlockRecord extends DxfRecord {
	readonly name: string;
	insertionUnits: number;
	explodability: number;
	scalability: number;
	layoutObject?: string;

	constructor(name: string) {
		super('BLOCK_RECORD');
		this.name = name;
		this.insertionUnits = 0;
		this.explodability = 1;
		this.scalability = 0;
	}

	dxify(mg: Dxifier): void {
		super.dxify(mg);
		mg.subclassMarker('AcDbBlockTableRecord');
		mg.name(this.name);
		mg.push(340, this.layoutObject);
		mg.push(70, this.insertionUnits);
		mg.push(280, this.explodability);
		mg.push(281, this.scalability);
	}
}
