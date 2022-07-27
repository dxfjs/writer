import DxfInterface from '../../Internals/Interfaces/DxfInterface';
import TagsManager from '../../Internals/TagsManager';
import DxfBlock from '../BlocksSection/DxfBlock';

export default class DxfEntitiesSection implements DxfInterface {
	readonly modelSpace: DxfBlock;

	constructor(modelSpace: DxfBlock) {
		this.modelSpace = modelSpace;
	}

	setLayerName(layerName: string) {
		this.modelSpace.setlayerName(layerName);
	}

	public get manager(): TagsManager {
		const manager = new TagsManager();
		manager.sectionStart('ENTITIES');
		for (let i = 0; i < this.modelSpace.entities.length; i++) {
			manager.append(this.modelSpace.entities[i]);
		}
		manager.sectionEnd();
		return manager;
	}

	public stringify(): string {
		return this.manager.stringify();
	}
}
