import TagsManager from '../../../Internals/TagsManager';
import DxfObject from '../DxfObject';

export default class DxfImageDefReactor extends DxfObject {
	classVersion: number;
	public constructor(imageId: string) {
		super('IMAGEDEF_REACTOR');
		this.softPointer = imageId;
		this.classVersion = 2;
	}

	public override get manager(): TagsManager {
		const manager = new TagsManager();
		manager.pushTags(super.manager.tags);
		manager.subclassMarker('AcDbRasterImageDefReactor');
		manager.addTag(90, this.classVersion);
		manager.pushTag(this.softPointerTag());
		return manager;
	}
}
