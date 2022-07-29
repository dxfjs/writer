import { Dxifier } from '../../../Internals/Dxifier';
import DxfObject from '../DxfObject';

export default class DxfRasterVariables extends DxfObject {
	constructor() {
		super('RASTERVARIABLES');
	}

	dxify(dx: Dxifier): void {
		super.dxify(dx);
		dx.subclassMarker('AcDbRasterVariables');
		dx.push(70, 0);
		dx.push(71, 1);
		dx.push(72, 0);
	}
}
