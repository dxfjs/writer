import TagsManager from '../../../../Internals/TagsManager';
import DxfRecord from './DxfRecord';

export default class DxfLineType extends DxfRecord {
	readonly name: string;
	readonly descriptive: string;
	readonly elements: number[];
	flags: number;

	public constructor(
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

	public override get manager(): TagsManager {
		const manager = new TagsManager();
		manager.pushTags(super.manager.tags);
		manager.subclassMarker('AcDbLinetypeTableRecord');
		manager.name(this.name);
		manager.addTag(70, this.flags);
		manager.addTag(3, this.descriptive);
		manager.addTag(72, 65);
		manager.addTag(73, this.elements.length);

		const sum = this.elements.reduce((sum, element) => {
			return sum + Math.abs(element);
		}, 0);
		manager.addTag(40, sum);
		this.elements.forEach((element) => {
			manager.addTag(49, element);
			manager.addTag(74, 0);
		});
		return manager;
	}
}
