import { Dxifier } from '../../../../Internals/Dxifier';
import DxfRecord, { StyleFlags } from './DxfRecord';

export default class DxfStyle extends DxfRecord {
	readonly name: string;
	fixedTextHeight = 0;
	widthFactor = 1;
	obliqueAngle = 0;
	textGenerationFlag = 0;
	lastHeightUsed = 1;
	fontFileName = 'txt';
	bigFontFileName = '';
	flags: StyleFlags;

	constructor(name: string, flags?: StyleFlags) {
		super('STYLE');
		this.name = name;
		this.flags = flags ?? StyleFlags.None;
	}

	dxify(mg: Dxifier): void {
		super.dxify(mg);
		mg.subclassMarker('AcDbTextStyleTableRecord');
		mg.name(this.name);
		mg.push(70, this.flags);
		mg.push(40, this.fixedTextHeight);
		mg.push(41, this.widthFactor);
		mg.push(50, this.obliqueAngle);
		mg.push(71, this.textGenerationFlag);
		mg.push(42, this.lastHeightUsed);
		mg.push(3, this.fontFileName);
		mg.push(4, this.bigFontFileName);
	}
}
