import TagsManager from '../../../Internals/TagsManager';
import DxfObject from '../DxfObject';

export default class DxfImageDefReactor extends DxfObject {
	readonly imageObjectId: string;

	public constructor(imageObjectId: string) {
		super('IMAGEDEF_REACTOR');
		this.imageObjectId = imageObjectId;
		this.softPointer = imageObjectId;
	}

	public override get manager(): TagsManager {
		const manager = new TagsManager();
		manager.pushTags(super.manager.tags);
		manager.subclassMarker('AcDbRasterImageDefReactor');
		manager.softPointer(this.imageObjectId);
		return manager;
	}
}
