import Handle from '../../Internals/Handle';
import DxfInterface from '../../Internals/Interfaces/DXFInterface';
import TagsManager from '../../Internals/TagsManager';

export default class DxfObject extends Handle implements DxfInterface {
	private _type: string;

	public get type(): string {
		return this._type;
	}

	public constructor(type: string) {
		super();
		this._type = type;
		this.softPointer = '0';
	}

	stringify(): string {
		return this.manager.stringify();
	}

	get manager(): TagsManager {
		const manager = new TagsManager();
		manager.entityType(this.type);
		manager.handle(this.handle);
		manager.pushTag(this.softPointerTag());
		return manager;
	}
}
