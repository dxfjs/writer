import TagsManager, { tag_t } from '../../../../Internals/TagsManager';
import DxfRecord from './DxfRecord';

export default class DxfLayer extends DxfRecord {
	get name(): string {
		return this._name;
	}
	get colorNumber(): number {
		return this._colorNumber;
	}
	get lineType(): string {
		return this._lineType;
	}

	private readonly _name: string;
	private readonly _colorNumber: number;
	private readonly _lineType: string;

	public constructor(name: string, color: number, lineType: string) {
		super('LAYER');

		this._name = name;
		this._colorNumber = color;
		this._lineType = lineType;
	}

	public tags(): tag_t[] {
		const manager = new TagsManager();
		manager.pushTags(super.tags());
		manager.subclassMarker('AcDbLayerTableRecord');
		manager.name(this.name);
		manager.addTag(70, 0);
		manager.colorNumber(this.colorNumber);
		manager.lineType(this.lineType);
		manager.addTag(370, 0); // TODO Refactor this to be dynamic
		manager.addTag(390, 0); // TODO Add ACDBPLACEHOLDER Object to support this
		manager.pushTags(this.hardPointersTags(7));
		return manager.tags;
	}
}
