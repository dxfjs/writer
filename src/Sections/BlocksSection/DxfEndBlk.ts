import { Dxifier } from '../../Internals/Dxifier';
import Handle from '../../Internals/Handle';
import DxfInterface from '../../Internals/Interfaces/DxfInterface';

export default class DxfEndBlk implements DxfInterface {
	readonly handle: string;
	ownerObjectHandle?: string;

	constructor() {
		this.handle = Handle.next();
	}

	dxify(mg: Dxifier): void {
		mg.type('ENDBLK');
		mg.handle(this.handle);
		mg.push(330, this.ownerObjectHandle);
		mg.subclassMarker('AcDbEntity');
		mg.layerName('0'); // TODO make this dynamic
		mg.subclassMarker('AcDbBlockEnd');
	}
}
