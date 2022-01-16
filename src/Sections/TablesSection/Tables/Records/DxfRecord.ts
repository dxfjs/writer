import Handle from '../../../../Internals/Handle';
import DxfInterface from '../../../../Internals/Interfaces/DxfInterface';
import TagsManager from '../../../../Internals/TagsManager';

export enum RecordFlags {
	DependentOnXref = 16,
	XrefResolved = 32,
}

export enum LayerFlags {
	Frozen = 1,
	FrozenInNewViewports = 2,
	Locked = 4,
	DependentOnXref = 16,
	XrefResolved = 32,
}

export enum StyleFlags {
	DescribeShape = 1,
	VerticalText = 4,
	DependentOnXref = 16,
	XrefResolved = 32,
}

export enum ViewFlags {
	PaperSpace = 1,
	DependentOnXref = 16,
	XrefResolved = 32,
}

export default class DxfRecord extends Handle implements DxfInterface {
	readonly entityType: string;

	public constructor(type: string) {
		super();
		this.entityType = type;
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
