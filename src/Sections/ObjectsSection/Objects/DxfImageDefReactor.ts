import TagsManager from '../../../Internals/TagsManager';
import DxfObject from '../DxfObject';

export default class DxfImageDefReactor extends DxfObject {
	classVersion: number;
	imageHandle: string
	public constructor(imageHandle: string) {
		super('IMAGEDEF_REACTOR');
		this.imageHandle = imageHandle;
		this.classVersion = 2;
	}

	public override get manager(): TagsManager {
		const manager = new TagsManager();
		manager.pushTags(super.manager.tags);
		manager.subclassMarker('AcDbRasterImageDefReactor');
		manager.addTag(90, this.classVersion);
		manager.addTag(330, this.imageHandle);
		return manager;
	}
}
