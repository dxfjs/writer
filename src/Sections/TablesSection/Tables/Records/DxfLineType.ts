import TagsManager from '../../../../Internals/TagsManager';
import DxfRecord from './DxfRecord';

export default class DxfLineType extends DxfRecord {
	private readonly _name: string;
	private readonly _descriptive: string;
	private readonly _elements: number[];

	public get name(): string {
		return this._name;
	}

	public get descriptive(): string {
		return this._descriptive;
	}

	public get elements(): number[] {
		return this._elements;
	}

	public constructor(name: string, descriptive: string, elements: number[]) {
		super('LTYPE');
		this._name = name;
		this._descriptive = descriptive;
		this._elements = elements;
	}

	public get manager(): TagsManager {
		const manager = new TagsManager();
		manager.pushTags(super.manager.tags);
		manager.subclassMarker('AcDbLinetypeTableRecord');
		manager.name(this.name);
		manager.addTag(70, 0);
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
