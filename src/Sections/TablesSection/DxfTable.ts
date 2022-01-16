import Handle from '../../Internals/Handle';
import DxfInterface from '../../Internals/Interfaces/DxfInterface';
import TagsManager from '../../Internals/TagsManager';

export default abstract class DxfTable extends Handle implements DxfInterface {
	maxNumberEntries: number = 0;

	public constructor(public name: string) {
		super();
		this.softPointer = '0';
	}

	public stringify(): string {
		return this.manager.stringify();
	}

	public get manager(): TagsManager {
		const manager = new TagsManager();
		manager.entityType('TABLE');
		manager.name(this.name);
		manager.handle(this.handle);
		manager.pushTag(this.softPointerTag());
		manager.subclassMarker('AcDbSymbolTable');
		manager.addTag(70, this.maxNumberEntries);
		return manager;
	}
}
