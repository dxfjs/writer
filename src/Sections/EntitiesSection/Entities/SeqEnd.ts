import { Dxifier } from '../../../Internals/Dxifier';
import Entity from '../Entity';

export default class SeqEnd extends Entity {
	constructor() {
		super('SEQEND');
	}

	dxify(mg: Dxifier): void {
		super.dxify(mg);
	}
}
