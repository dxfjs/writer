import { Dxifier } from 'Internals/Dxifier';
import DxfRecord, { LayerFlags } from './DxfRecord';

export default class DxfLayer extends DxfRecord {
	readonly name: string;
	colorNumber: number;
	lineType: string;
	flags: LayerFlags;
	materialObject?: string;

	constructor(
		name: string,
		color: number,
		lineType: string,
		flags?: LayerFlags
	) {
		super('LAYER');

		this.name = name;
		this.colorNumber = color;
		this.lineType = lineType;
		this.flags = flags ?? LayerFlags.None;
	}

	override dxify(dx: Dxifier): void {
		super.dxify(dx);
		dx.subclassMarker('AcDbLayerTableRecord');
		dx.name(this.name);
		dx.push(70, this.flags);
		dx.colorNumber(this.colorNumber);
		dx.lineType(this.lineType);
		dx.push(370, 0); // TODO Refactor this to be dynamic
		dx.push(390, 0); // TODO Add ACDBPLACEHOLDER Object to support this
		dx.push(347, this.materialObject);
	}
}
