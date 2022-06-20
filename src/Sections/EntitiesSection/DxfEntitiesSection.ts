import DxfInterface from '../../Internals/Interfaces/DxfInterface';
import TagsManager from '../../Internals/TagsManager';
import DxfBlock from '../BlocksSection/DxfBlock';

export default class DxfEntitiesSection implements DxfInterface {
	readonly modelSpace: DxfBlock;

	constructor(modelSpace: DxfBlock) {
		this.modelSpace = modelSpace;
	}

	public get manager(): TagsManager {
		const manager = new TagsManager();
		manager.sectionStart('ENTITIES');
		this.modelSpace.entities.forEach((entity) => {
			manager.appendTags(entity);
		});
		manager.sectionEnd();
		return manager;
	}

	public stringify(): string {
		return this.manager.stringify();
	}
}
