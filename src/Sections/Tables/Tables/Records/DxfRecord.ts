import Handle from '../../../../Internals/Handle';
import DxfInterface from '../../../../Internals/Interfaces/DxfInterface';
import TagsManager from '../../../../Internals/TagsManager';

export default class DxfRecord extends Handle implements DxfInterface {
	private readonly _entityType: string;

	public get entityType(): string {
		return this._entityType;
	}

	public constructor(type: string) {
		super();
		this._entityType = type;
	}

	public stringify(): string {
		return this.manager.stringify();
	}

	public get manager(): TagsManager {
		const manager = new TagsManager();
		manager.entityType(this.entityType);
		manager.handle(this.handle);
		manager.pushTag(this.softPointerTag());
		manager.subclassMarker('AcDbSymbolTableRecord');
		return manager;
	}
}
