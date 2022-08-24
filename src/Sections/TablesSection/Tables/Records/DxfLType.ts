import { Dxifier } from 'Internals/Dxifier';
import DxfRecord from './DxfRecord';

export default class DxfLType extends DxfRecord {
	readonly name: string;
	readonly descriptive: string;
	readonly elements: number[];
	flags: number;

	constructor(name: string, descriptive: string, elements: number[], flags?: number) {
		super('LTYPE');
		this.name = name;
		this.descriptive = descriptive;
		this.elements = elements;
		this.flags = flags ?? 0;
	}

	override dxify(dx: Dxifier): void {
		super.dxify(dx);
		dx.subclassMarker('AcDbLinetypeTableRecord');
		dx.name(this.name);
		dx.push(70, this.flags);
		dx.push(3, this.descriptive);
		dx.push(72, 65);
		dx.push(73, this.elements.length);

		let sum = 0;
		for (const element of this.elements) {
			sum += Math.abs(element);
		}
		dx.push(40, sum);

		for (const element of this.elements) {
			dx.push(49, element);
			dx.push(74, 0);
		}
	}
}
