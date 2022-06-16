import TagsManager from '../../../Internals/TagsManager';
import DxfObject from '../DxfObject';

export default class DxfImageDefReactor extends DxfObject {
	classVersion: number;
	imageHandle: string;

	constructor(imageHandle: string) {
		super('IMAGEDEF_REACTOR');
		this.imageHandle = imageHandle;
		this.classVersion = 2;
	}

	override get manager(): TagsManager {
		const manager = new TagsManager();
		manager.push(super.manager.tags);
		manager.subclassMarker('AcDbRasterImageDefReactor');
		manager.add(90, this.classVersion);
		manager.add(330, this.imageHandle);
		return manager;
	}
}
