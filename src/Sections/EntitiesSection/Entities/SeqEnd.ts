import { Dxfier } from 'Internals/Dxfier';
import Entity from '../Entity';

export default class SeqEnd extends Entity {
	constructor() {
		super('SEQEND');
	}

	override dxfy(dx: Dxfier): void {
		super.dxfy(dx);
	}
}
