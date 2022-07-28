import { Dxifier } from '../../../../Internals/Dxifier';
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

	dxify(mg: Dxifier): void {
		super.dxify(mg);
		mg.subclassMarker('AcDbLayerTableRecord');
		mg.name(this.name);
		mg.push(70, this.flags);
		mg.colorNumber(this.colorNumber);
		mg.lineType(this.lineType);
		mg.push(370, 0); // TODO Refactor this to be dynamic
		mg.push(390, 0); // TODO Add ACDBPLACEHOLDER Object to support this
		mg.push(347, this.materialObject);
	}
}
