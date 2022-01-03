import Handle from '../../Internals/Handle';
import TagsManager from '../../Internals/TagsManager';

export default class DxfObject extends Handle {
	private _type: string;

	public get type(): string {
		return this._type;
	}

	public constructor(type: string) {
		super();
		this._type = type;
	}

	public tags() {
		const manager = new TagsManager();
		manager.entityType(this.type);
		manager.handle(this.handle);
		manager.pushTags(this.softPointersTags());
		return manager.tags;
	}
}
