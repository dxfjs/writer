import TagsManager from '../../../Internals/TagsManager';
import DxfObject from '../DxfObject';

export default class DxfRasterVariables extends DxfObject {
	constructor() {
		super('RASTERVARIABLES');
	}

	override get manager(): TagsManager {
		const manager = new TagsManager();
		manager.push(super.manager.tags);
		manager.subclassMarker('AcDbRasterVariables');
		manager.add(70, 0);
		manager.add(71, 1);
		manager.add(72, 0);
		return manager;
	}
}
