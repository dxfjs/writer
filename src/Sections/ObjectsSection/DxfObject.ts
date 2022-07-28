import { Dxifier } from '../../Internals/Dxifier';
import Handle from '../../Internals/Handle';
import DxfInterface from '../../Internals/Interfaces/DxfInterface';

export default class DxfObject implements DxfInterface {
	readonly type: string;
	readonly handle: string;
	ownerObjecthandle: string;

	constructor(type: string) {
		this.type = type;
		this.ownerObjecthandle = '0';
		this.handle = Handle.next();
	}

	dxify(mg: Dxifier) {
		mg.type(this.type);
		mg.handle(this.handle);
		mg.push(330, this.ownerObjecthandle);
	}
}
