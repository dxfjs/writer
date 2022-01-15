import TagsManager from '../../../../Internals/TagsManager';
import DxfRecord from './DxfRecord';

export default class DxfLayer extends DxfRecord {
	private readonly _name: string;
	private _colorNumber: number;
	private _lineType: string;
	private _flags: number;

	public get name(): string {
		return this._name;
	}

	public get colorNumber(): number {
		return this._colorNumber;
	}

	public set colorNumber(value: number) {
		this._colorNumber = value;
	}

	public get lineType(): string {
		return this._lineType;
	}

	public set lineType(value: string) {
		this._lineType = value;
	}

	public get flags(): number {
		return this._flags;
	}
	public set flags(value: number) {
		this._flags = value;
	}

	public constructor(
		name: string,
		color: number,
		lineType: string,
		flags: number
	) {
		super('LAYER');

		this._name = name;
		this._colorNumber = color;
		this._lineType = lineType;
		this._flags = flags;
	}

	public get manager(): TagsManager {
		const manager = new TagsManager();
		manager.pushTags(super.manager.tags);
		manager.subclassMarker('AcDbLayerTableRecord');
		manager.name(this.name);
		manager.addTag(70, this.flags);
		manager.colorNumber(this.colorNumber);
		manager.lineType(this.lineType);
		manager.addTag(370, 0); // TODO Refactor this to be dynamic
		manager.addTag(390, 0); // TODO Add ACDBPLACEHOLDER Object to support this
		manager.pushTag(this.hardPointerTag(7));
		return manager;
	}
}
