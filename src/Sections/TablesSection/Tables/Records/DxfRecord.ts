import Handle from '../../../../Internals/Handle';
import DxfInterface from '../../../../Internals/Interfaces/DxfInterface';
import TagsManager from '../../../../Internals/TagsManager';

/**
 * @public
 */
export enum RecordFlags {
	DependentOnXref = 16,
	XrefResolved = 32,
}

/**
 * @public
 */
export enum LayerFlags {
	Frozen = 1,
	FrozenInNewViewports = 2,
	Locked = 4,
	DependentOnXref = 16,
	XrefResolved = 32,
}

/**
 * @public
 */
export enum StyleFlags {
	DescribeShape = 1,
	VerticalText = 4,
	DependentOnXref = 16,
	XrefResolved = 32,
}

/**
 * @public
 */
export enum ViewFlags {
	PaperSpace = 1,
	DependentOnXref = 16,
	XrefResolved = 32,
}

export default class DxfRecord implements DxfInterface {
	readonly entityType: string;
	readonly handle: string;
	ownerObject?: string

	public constructor(type: string) {
		this.entityType = type;
		this.handle = Handle.next()
	}

	public stringify(): string {
		return this.manager.stringify();
	}

	public get manager(): TagsManager {
		const manager = new TagsManager();
		manager.entityType(this.entityType);
		manager.handle(this.handle);
		manager.addTag(330, this.ownerObject);
		manager.subclassMarker('AcDbSymbolTableRecord');
		return manager;
	}
}
