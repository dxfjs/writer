import DxfDefinedApplication from '../../../Internals/DefinedApplication';
import TagsManager, { point2d } from '../../../Internals/TagsManager';
import DxfObject from '../DxfObject';

export default class DxfImageDef extends DxfObject {
	private readonly _fileName: string;
	private _acadImageDicId: string;
	private _imageReactorId: string;

	public get fileName(): string {
		return this._fileName;
	}

	public get acadImageDicId(): string {
		return this._acadImageDicId;
	}

	public set acadImageDicId(value: string) {
		this._acadImageDicId = value;
	}

	public get imageReactorId(): string {
		return this._imageReactorId;
	}
	public set imageReactorId(value: string) {
		this._imageReactorId = value;
	}

	public constructor(fileName: string) {
		super('IMAGEDEF');
		this._fileName = fileName;
		this._acadImageDicId = '';
		this._imageReactorId = '';
	}

	public get manager(): TagsManager {
		const definedApp = new DxfDefinedApplication('ACAD_REACTORS');
		definedApp.addTag(330, this.acadImageDicId);
		definedApp.addTag(330, this.imageReactorId);

		const manager = new TagsManager();
		manager.pushTags(super.manager.tags);
		manager.appendTags(definedApp);
		manager.subclassMarker('AcDbRasterImageDef');
		manager.addTag(1, this.fileName);
		manager.point2d(point2d(1, 1));
		manager.point2d(point2d(1, 1), 1);
		manager.addTag(280, 1);
		manager.addTag(281, 0);
		return manager;
	}
}
