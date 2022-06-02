import Handle from '../../Internals/Handle';
import DxfInterface from '../../Internals/Interfaces/DxfInterface';
import TagsManager from '../../Internals/TagsManager';

export default class DxfObject implements DxfInterface {
	readonly type: string;
	readonly handle: string;
	ownerObject: string;

	public constructor(type: string) {
		this.type = type;
		this.ownerObject = '0';
		this.handle = Handle.next();
	}

	public stringify(): string {
		return this.manager.stringify();
	}

	public get manager(): TagsManager {
		const manager = new TagsManager();
		manager.entityType(this.type);
		manager.handle(this.handle);
		manager.addTag(330, this.ownerObject);
		return manager;
	}
}
