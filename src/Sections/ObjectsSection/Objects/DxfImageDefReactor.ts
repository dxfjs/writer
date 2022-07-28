import { Dxifier } from '../../../Internals/Dxifier';
import DxfObject from '../DxfObject';

export default class DxfImageDefReactor extends DxfObject {
	classVersion: number;
	imageHandle: string;

	constructor(imageHandle: string) {
		super('IMAGEDEF_REACTOR');
		this.imageHandle = imageHandle;
		this.classVersion = 2;
	}

	dxify(mg: Dxifier): void {
		super.dxify(mg);
		mg.subclassMarker('AcDbRasterImageDefReactor');
		mg.push(90, this.classVersion);
		mg.push(330, this.imageHandle);
	}
}
