import TagsManager from '../../../Internals/TagsManager';
import DxfObject from '../DxfObject';

export default class DxfRasterVariables extends DxfObject {
	public constructor() {
		super('RASTERVARIABLES');
	}

	public get manager(): TagsManager {
		const manager = new TagsManager();
		manager.pushTags(super.manager.tags);
		manager.subclassMarker('AcDbRasterVariables');
		manager.addTag(70, 0);
		manager.addTag(71, 1);
		manager.addTag(72, 0);
		return manager;
	}
}
