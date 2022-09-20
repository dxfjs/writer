import { Dxfier } from 'Internals/Dxfier';
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

	override dxfy(dx: Dxfier): void {
		super.dxfy(dx);
		dx.subclassMarker('AcDbTextStyleTableRecord');
		dx.name(this.name);
		dx.push(70, this.flags);
		dx.push(40, this.fixedTextHeight);
		dx.push(41, this.widthFactor);
		dx.push(50, this.obliqueAngle);
		dx.push(71, this.textGenerationFlag);
		dx.push(42, this.lastHeightUsed);
		dx.push(3, this.fontFileName);
		dx.push(4, this.bigFontFileName);
	}
}
