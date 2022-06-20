import Handle from '../../Internals/Handle';
import DxfInterface from '../../Internals/Interfaces/DxfInterface';
import TagsManager from '../../Internals/TagsManager';

export default class DxfEndBlk implements DxfInterface {
	readonly handle: string;
	ownerObject?: string;

	constructor() {
		this.handle = Handle.next();
	}

	public stringify(): string {
		return this.manager.stringify();
	}

	public get manager(): TagsManager {
		const manager = new TagsManager();
		manager.entityType('ENDBLK');
		manager.handle(this.handle);
		manager.add(330, this.ownerObject);
		manager.subclassMarker('AcDbEntity');
		manager.layerName('0'); // TODO make this dynamic
		manager.subclassMarker('AcDbBlockEnd');
		return manager;
	}
}
