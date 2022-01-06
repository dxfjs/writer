import TagsManager from '../../../Internals/TagsManager';
import DxfObject from '../DxfObject';

export default class DxfImageDefReactor extends DxfObject {
	private readonly _imageObjectId: string;

	public get imageObjectId(): string {
		return this._imageObjectId;
	}

	public constructor(imageObjectId: string) {
		super('IMAGEDEF_REACTOR');
		this._imageObjectId = imageObjectId;
		this.softPointer = imageObjectId;
	}

	public get manager(): TagsManager {
		const manager = new TagsManager();
		manager.pushTags(super.manager.tags);
		manager.subclassMarker('AcDbRasterImageDefReactor');
		manager.softPointer(this.imageObjectId);
		return manager;
	}
}
