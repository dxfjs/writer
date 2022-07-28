import { Dxifier } from '../../../Internals/Dxifier';
import DxfObject from '../DxfObject';

export default class DxfRasterVariables extends DxfObject {
	constructor() {
		super('RASTERVARIABLES');
	}

	dxify(mg: Dxifier): void {
		super.dxify(mg);
		mg.subclassMarker('AcDbRasterVariables');
		mg.push(70, 0);
		mg.push(71, 1);
		mg.push(72, 0);
	}
}
