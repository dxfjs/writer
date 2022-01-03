import TagsManager, { tag_t } from '../../../Internals/TagsManager';
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

	tags(): tag_t[] {
		const manager = new TagsManager();
		manager.pushTags(super.tags());
		manager.subclassMarker('AcDbRasterImageDef');
		manager.addTag(1, this.fileName);
		manager.addTag(280, 1);
		return manager.tags;
	}
}
