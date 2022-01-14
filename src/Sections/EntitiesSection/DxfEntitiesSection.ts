import DxfInterface from '../../Internals/Interfaces/DxfInterface';
import TagsManager from '../../Internals/TagsManager';
import DxfBlock from '../BlocksSection/DxfBlock';
import DxfBlocksSection from '../BlocksSection/DxfBlocksSection';

export default class DxfEntitiesSection implements DxfInterface {
	private static _instance: DxfEntitiesSection;
	private readonly _modelSpace: DxfBlock;

	public get modelSpace(): DxfBlock {
		return this._modelSpace;
	}

	private constructor() {
		this._modelSpace = DxfBlocksSection.getInstance().modelSpace;
	}

	public static getInstance(): DxfEntitiesSection {
		if (!this._instance) this._instance = new DxfEntitiesSection();
		return this._instance;
	}

	public get manager(): TagsManager {
		const manager = new TagsManager();
		manager.sectionBegin('ENTITIES');
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
