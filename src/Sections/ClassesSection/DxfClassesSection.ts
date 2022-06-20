import DxfInterface from '../../Internals/Interfaces/DxfInterface';
import TagsManager from '../../Internals/TagsManager';

export default class DxfClassesSection implements DxfInterface {
	static #instance: DxfClassesSection;

	static getInstance(): DxfClassesSection {
		if (!this.#instance) this.#instance = new DxfClassesSection();
		return this.#instance;
	}

	get manager(): TagsManager {
		const manager = new TagsManager();
		manager.sectionStart('CLASSES');
		manager.sectionEnd();
		return manager;
	}

	stringify(): string {
		return this.manager.stringify();
	}
}
