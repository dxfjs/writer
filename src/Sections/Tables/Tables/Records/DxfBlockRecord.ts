import TagsManager, { tag_t } from '../../../../Internals/TagsManager';
import DxfRecord from './DxfRecord';

export default class DxfBlockRecord extends DxfRecord {
	private readonly _name: string;
	private _insertionUnits: number = 0;
	private _explodability: number = 1;
	private _scalability: number = 0;

	public get name(): string {
		return this._name;
	}

	public get insertionUnits(): number {
		return this._insertionUnits;
	}

	public set insertionUnits(value: number) {
		this._insertionUnits = value;
	}

	public get explodability(): number {
		return this._explodability;
	}

	public set explodability(value: number) {
		this._explodability = value;
	}

	public get scalability(): number {
		return this._scalability;
	}

	public set scalability(value: number) {
		this._scalability = value;
	}

	public constructor(name: string) {
		super('BLOCK_RECORD');
		this._name = name;
	}

	public tags(): tag_t[] {
		const manager = new TagsManager();
		manager.pushTags(super.tags());
		manager.subclassMarker('AcDbRegAppTableRecord');
		manager.name(this._name);
		manager.addTag(70, 0);
		manager.pushTags(this.hardPointersTags());
		manager.addTag(70, this.insertionUnits);
		manager.addTag(280, this.explodability);
		manager.addTag(280, this.scalability);
		return manager.tags;
	}
}
