import DxfInterface from './Interfaces/DxfInterface';
import TagsManager, { tag, tag_t } from './TagsManager';

export default class DxfDefinedApplication implements DxfInterface {
	readonly name: string;
	readonly tags: tag_t[];

	constructor(name: string) {
		this.name = name;
		this.tags = [];
	}

	add(groupCode: number, value: string) {
		this.tags.push(tag(groupCode, value));
	}

	stringify(): string {
		return this.manager.stringify();
	}

	get manager(): TagsManager {
		const manager = new TagsManager();
		manager.add(102, `{${this.name}`);
		this.tags.forEach((tag) => {
			manager.push(tag);
		});
		manager.add(102, '}');
		return manager;
	}
}
