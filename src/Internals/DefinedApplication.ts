import DxfInterface from './Interfaces/DXFInterface';
import TagsManager, { createTag, tag_t } from './TagsManager';

export default class DxfDefinedApplication implements DxfInterface {
	private readonly _name: string;
	private readonly _tags: tag_t[] = [];

	public get name(): string {
		return this._name;
	}

	public get tags(): tag_t[] {
		return this._tags;
	}

	public constructor(name: string) {
		this._name = name;
	}

	public addTag(groupCode: number, value: string) {
		this._tags.push(createTag(groupCode, value));
	}

	stringify(): string {
		return this.manager.stringify();
	}

	get manager(): TagsManager {
		const manager = new TagsManager();
		manager.addTag(102, `{${this.name}`);
		this.tags.forEach((tag) => {
			manager.pushTag(tag);
		});
		manager.addTag(102, '}');
		return manager;
	}
}
