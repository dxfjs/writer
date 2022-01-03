import Handle from '../../../../Internals/Handle';
import TagsManager from '../../../../Internals/TagsManager';

export default class DxfRecord extends Handle {
	private readonly _entityType: string;

	public get entityType(): string {
		return this._entityType;
	}

	public constructor(type: string) {
		super();
		this._entityType = type;
	}

	public tags() {
		const manager = new TagsManager();
		manager.entityType(this.entityType);
		manager.handle(this.handle);
		// TODO Defined Applications
		manager.pushTags(this.softPointersTags());
		manager.subclassMarker('AcDbSymbolTableRecord');
		return manager.tags;
	}
}
