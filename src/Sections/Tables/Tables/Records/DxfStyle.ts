import TagsManager, { tag_t } from '../../../../Internals/TagsManager';
import DxfRecord from './DxfRecord';

export default class DxfStyle extends DxfRecord {
	private readonly _name: string;
	private _fixedTextHeight: number = 0;
	private _widthFactor: number = 1;
	private _obliqueAngle: number = 0;
	private _textGenerationFlag: number = 0;
	private _lastHeightUsed: number = 1;
	private _fontFileName: string = 'txt';
	private _bigFontFileName: string = '';

	public get name(): string {
		return this._name;
	}

	public get fixedTextHeight(): number {
		return this._fixedTextHeight;
	}

	public set fixedTextHeight(value: number) {
		this._fixedTextHeight = value;
	}

	public get widthFactor(): number {
		return this._widthFactor;
	}

	public set widthFactor(value: number) {
		this._widthFactor = value;
	}

	public get obliqueAngle(): number {
		return this._obliqueAngle;
	}

	public set obliqueAngle(value: number) {
		this._obliqueAngle = value;
	}

	public get textGenerationFlag(): number {
		return this._textGenerationFlag;
	}

	public set textGenerationFlag(value: number) {
		this._textGenerationFlag = value;
	}

	public get lastHeightUsed(): number {
		return this._lastHeightUsed;
	}

	public set lastHeightUsed(value: number) {
		this._lastHeightUsed = value;
	}

	public get bigFontFileName(): string {
		return this._bigFontFileName;
	}

	public set bigFontFileName(value: string) {
		this._bigFontFileName = value;
	}

	public constructor(name: string) {
		super('STYLE');
		this._name = name;
	}

	public get fontFileName(): string {
		return this._fontFileName;
	}
	public set fontFileName(value: string) {
		this._fontFileName = value;
	}

	public tags(): tag_t[] {
		const manager = new TagsManager();
		manager.pushTags(super.tags());
		manager.subclassMarker('AcDbTextStyleTableRecord');
		manager.name(this.name);
		manager.addTag(70, 0);
		manager.addTag(40, this.fixedTextHeight);
		manager.addTag(41, this.widthFactor);
		manager.addTag(50, this.obliqueAngle);
		manager.addTag(71, this.textGenerationFlag);
		manager.addTag(42, this.lastHeightUsed);
		manager.addTag(3, this.fontFileName);
		manager.addTag(4, this.bigFontFileName);
		return manager.tags;
	}
}
