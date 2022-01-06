import TagsManager from '../../../Internals/TagsManager';
import DxfObject from '../DxfObject';

export default class DxfImageDef extends DxfObject {
	private readonly _fileName: string;

	public get fileName(): string {
		return this._fileName;
	}

	public constructor(fileName: string) {
		super('IMAGEDEF');
		this._fileName = fileName;
	}

	public get manager(): TagsManager {
		const manager = new TagsManager();
		manager.pushTags(super.manager.tags);
		manager.subclassMarker('AcDbRasterImageDef');
		manager.addTag(1, this.fileName);
		manager.addTag(280, 1);
		manager.addTag(281, 0);
		return manager;
	}
}
