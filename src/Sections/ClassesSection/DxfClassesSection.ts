import DxfInterface from '../../Internals/Interfaces/DxfInterface';
import TagsManager from '../../Internals/TagsManager';

export default class DxfClassesSection implements DxfInterface {
	static #instance: DxfClassesSection;

	public static getInstance(): DxfClassesSection {
		if (!this.#instance) this.#instance = new DxfClassesSection();
		return this.#instance;
	}

	public get manager(): TagsManager {
		const manager = new TagsManager();
		manager.sectionBegin('CLASSES');
		manager.sectionEnd();
		return manager;
	}

	public stringify(): string {
		return this.manager.stringify();
	}
}
