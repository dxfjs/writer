import TagsManager from '../../../Internals/TagsManager';
import DxfObject from '../DxfObject';

export default class DxfImageDefReactor extends DxfObject {
	public constructor(imageId: string) {
		super('IMAGEDEF_REACTOR');
		this.softPointer = imageId;
	}

	public override get manager(): TagsManager {
		const manager = new TagsManager();
		manager.pushTags(super.manager.tags);
		manager.subclassMarker('AcDbRasterImageDefReactor');
		manager.pushTag(this.softPointerTag());
		return manager;
	}
}
