import DxfInterface from '../../Internals/Interfaces/DxfInterface';
import TagsManager from '../../Internals/TagsManager';
import DxfBlock from '../BlocksSection/DxfBlock';
import DxfBlocksSection from '../BlocksSection/DxfBlocksSection';

export default class DxfEntitiesSection implements DxfInterface {
	static #instance: DxfEntitiesSection;
	readonly modelSpace: DxfBlock;

	private constructor() {
		this.modelSpace = DxfBlocksSection.getInstance().modelSpace;
	}

	public static getInstance(): DxfEntitiesSection {
		if (!this.#instance) this.#instance = new DxfEntitiesSection();
		return this.#instance;
	}

	public get manager(): TagsManager {
		const manager = new TagsManager();
		manager.sectionStart('ENTITIES');
		this.modelSpace.entities.forEach((entity) => {
			manager.append(entity);
		});
		manager.sectionEnd();
		return manager;
	}

	public stringify(): string {
		return this.manager.stringify();
	}
}
