import DxfInterface from '../../Internals/Interfaces/DxfInterface';
import TagsManager from '../../Internals/TagsManager';

export default class DxfClasses implements DxfInterface {
	public constructor() {}

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
