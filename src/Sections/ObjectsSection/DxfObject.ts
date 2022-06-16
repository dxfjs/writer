import Handle from '../../Internals/Handle';
import DxfInterface from '../../Internals/Interfaces/DxfInterface';
import TagsManager from '../../Internals/TagsManager';

export default class DxfObject implements DxfInterface {
	readonly type: string;
	readonly handle: string;
	ownerObjecthandle: string;

	constructor(type: string) {
		this.type = type;
		this.ownerObjecthandle = '0';
		this.handle = Handle.next();
	}

	stringify(): string {
		return this.manager.stringify();
	}

	get manager(): TagsManager {
		const manager = new TagsManager();
		manager.entityType(this.type);
		manager.handle(this.handle);
		manager.add(330, this.ownerObjecthandle);
		return manager;
	}
}
