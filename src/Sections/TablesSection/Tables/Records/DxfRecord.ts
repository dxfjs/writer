import Handle from '../../../../Internals/Handle';
import DxfInterface from '../../../../Internals/Interfaces/DxfInterface';
import TagsManager from '../../../../Internals/TagsManager';

export enum LayerFlags {
	None = 0,
	Frozen = 1,
	FrozenInNewViewports = 2,
	Locked = 4,
	XRefDependent = 16,
	XRefResolved = 32,
}

export enum StyleFlags {
	None = 0,
	DescribeShape = 1,
	VerticalText = 4,
	XRefDependent = 16,
	XRefResolved = 32,
}

export enum ViewFlags {
	None = 0,
	PaperSpace = 1,
	XRefDependent = 16,
	XRefResolved = 32,
}

export default class DxfRecord implements DxfInterface {
	readonly entityType: string;
	readonly handle: string;
	ownerObjectHandle?: string;

	constructor(type: string) {
		this.entityType = type;
		this.handle = Handle.next();
	}

	stringify(): string {
		return this.manager.stringify();
	}

	get manager(): TagsManager {
		const manager = new TagsManager();
		manager.entityType(this.entityType);
		manager.handle(this.handle);
		manager.add(330, this.ownerObjectHandle);
		manager.subclassMarker('AcDbSymbolTableRecord');
		return manager;
	}
}
