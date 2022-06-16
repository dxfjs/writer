import TagsManager from '../../../../Internals/TagsManager';
import DxfRecord from './DxfRecord';

/**
 * @public
 */
export default class DxfLineType extends DxfRecord {
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

	override get manager(): TagsManager {
		const manager = new TagsManager();
		manager.push(super.manager.tags);
		manager.subclassMarker('AcDbLinetypeTableRecord');
		manager.name(this.name);
		manager.add(70, this.flags);
		manager.add(3, this.descriptive);
		manager.add(72, 65);
		manager.add(73, this.elements.length);

		const sum = this.elements.reduce((sum, element) => {
			return sum + Math.abs(element);
		}, 0);
		manager.add(40, sum);
		this.elements.forEach((element) => {
			manager.add(49, element);
			manager.add(74, 0);
		});
		return manager;
	}
}
