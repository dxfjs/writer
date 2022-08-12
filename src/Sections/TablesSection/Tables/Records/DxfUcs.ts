import { Dxifier } from '../../../../Internals/Dxifier';
import DxfRecord from './DxfRecord';

export default class DxfUcs extends DxfRecord {
	readonly name: string;

	constructor(name: string) {
		super('UCS');
		this.name = name;
	}

	override dxify(dx: Dxifier): void {
		super.dxify(dx);
	}
}
