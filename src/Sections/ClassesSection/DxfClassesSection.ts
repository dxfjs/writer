import DxfInterface from '../../Internals/Interfaces/DxfInterface';
import TagsManager from '../../Internals/TagsManager';

export default class DxfClassesSection implements DxfInterface {
	public get manager(): TagsManager {
		const manager = new TagsManager();
		manager.sectionStart('CLASSES');
		manager.sectionEnd();
		return manager;
	}

	public stringify(): string {
		return this.manager.stringify();
	}
}
