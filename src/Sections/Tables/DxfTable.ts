import Handle from '../../Internals/Handle';
import DxfInterface from '../../Internals/Interfaces/DxfInterface';
import TagsManager from '../../Internals/TagsManager';

export default class DxfTable extends Handle implements DxfInterface {
	private _maxNumberEntries: number = 0;

	public get maxNumberEntries(): number {
		return this._maxNumberEntries;
	}
	public set maxNumberEntries(value: number) {
		this._maxNumberEntries = value;
	}

	get name(): string {
		return this._name;
	}

	public constructor(private _name: string) {
		super();
		this.softPointer = '0';
	}

	stringify(): string {
		return this.manager.stringify();
	}

	get manager(): TagsManager {
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
