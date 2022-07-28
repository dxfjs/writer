import { Dxifier } from '../../../../Internals/Dxifier';
import DxfRecord from './DxfRecord';

export default class DxfLType extends DxfRecord {
	readonly name: string;
	readonly descriptive: string;
	readonly elements: number[];
	flags: number;

	constructor(
		name: string,
		descriptive: string,
		elements: number[],
		flags?: number
	) {
		super('LTYPE');
		this.name = name;
		this.descriptive = descriptive;
		this.elements = elements;
		this.flags = flags ?? 0;
	}

	dxify(mg: Dxifier): void {
		super.dxify(mg);
		mg.subclassMarker('AcDbLinetypeTableRecord');
		mg.name(this.name);
		mg.push(70, this.flags);
		mg.push(3, this.descriptive);
		mg.push(72, 65);
		mg.push(73, this.elements.length);

		let sum = 0;
		for (const element of this.elements) {
			sum += Math.abs(element);
		}
		mg.push(40, sum);

		for (const element of this.elements) {
			mg.push(49, element);
			mg.push(74, 0);
		}
	}
}
