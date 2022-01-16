import Handle from '../../Internals/Handle';
import DxfInterface from '../../Internals/Interfaces/DxfInterface';
import TagsManager from '../../Internals/TagsManager';

export default class DxfObject extends Handle implements DxfInterface {
	readonly type: string;

	public constructor(type: string) {
		super();
		this.type = type;
		this.softPointer = '0';
	}

	public stringify(): string {
		return this.manager.stringify();
	}

	public get manager(): TagsManager {
		const manager = new TagsManager();
		manager.entityType(this.type);
		manager.handle(this.handle);
		manager.pushTag(this.softPointerTag());
		return manager;
	}
}
