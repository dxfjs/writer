import DxfInterface from '../../Internals/Interfaces/DxfInterface';
import TagsManager from '../../Internals/TagsManager';

export default class DxfClassesSection implements DxfInterface {
	private static _instance: DxfClassesSection;

	private constructor() {}

	public static getInstance(): DxfClassesSection {
		if (!this._instance) this._instance = new DxfClassesSection();
		return this._instance;
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
