import { Dxifier } from 'Internals/Dxifier';
import Entity from '../Entity';

export default class SeqEnd extends Entity {
	constructor() {
		super('SEQEND');
	}

	override dxify(dx: Dxifier): void {
		super.dxify(dx);
	}
}
