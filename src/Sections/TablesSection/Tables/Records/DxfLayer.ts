import { Dxfier } from 'Internals/Dxfier';
import DxfRecord, { LayerFlags } from './DxfRecord';

export class DxfLayer extends DxfRecord {
	static layerZeroName = '0';
	readonly name: string;
	colorNumber: number;
	lineType: string;
	flags: LayerFlags;
	materialObject?: string;
	trueColor?: number;

	constructor(name: string, color: number, lineType: string, flags?: LayerFlags) {
		super('LAYER');

		this.name = name;
		this.colorNumber = color;
		this.lineType = lineType;
		this.flags = flags ?? LayerFlags.None;
	}

	override dxfy(dx: Dxfier): void {
		super.dxfy(dx);
		dx.subclassMarker('AcDbLayerTableRecord');
		dx.name(this.name);
		dx.push(70, this.flags);
		dx.colorNumber(this.colorNumber);
		dx.push(420, this.trueColor);
		dx.lineType(this.lineType);
		dx.push(370, 0); // TODO Refactor this to be dynamic
		dx.push(390, 0); // TODO Add ACDBPLACEHOLDER Object to support this
		dx.push(347, this.materialObject);
	}
}
