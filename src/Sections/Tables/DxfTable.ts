import Handle from '../../Internals/Handle';
import TagsManager, { tag_t } from '../../Internals/TagsManager';

export default class DxfTable extends Handle {
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
	}

	tags(): tag_t[] {
		const manager = new TagsManager();
		manager.entityType('TABLE');
		manager.name(this.name);
		manager.handle(this.handle);
		//manager.pushTags(this.softPointersTags());
		manager.subclassMarker('AcDbSymbolTable');
		manager.addTag(70, this.maxNumberEntries);
		return manager.tags;
	}
}
