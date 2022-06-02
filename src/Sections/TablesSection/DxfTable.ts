import Handle from '../../Internals/Handle';
import DxfInterface from '../../Internals/Interfaces/DxfInterface';
import TagsManager from '../../Internals/TagsManager';

export default abstract class DxfTable implements DxfInterface {
	maxNumberEntries = 0;
	readonly handle: string;
	ownerObject: string;

	public constructor(public name: string) {
		this.ownerObject = '0';
		this.handle = Handle.next();
	}

	public stringify(): string {
		return this.manager.stringify();
	}

	public get manager(): TagsManager {
		const manager = new TagsManager();
		manager.entityType('TABLE');
		manager.name(this.name);
		manager.handle(this.handle);
		manager.addTag(330, this.ownerObject);
		manager.subclassMarker('AcDbSymbolTable');
		manager.addTag(70, this.maxNumberEntries);
		return manager;
	}
}
