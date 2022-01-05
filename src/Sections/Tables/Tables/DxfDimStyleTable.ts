import DxfDimStyle from './Records/DxfDimStyle';
import TagsManager from '../../../Internals/TagsManager';
import Handle from '../../../Internals/Handle';
import DxfInterface from '../../../Internals/Interfaces/DXFInterface';

export default class DxfDimStyleTable extends Handle implements DxfInterface {
	private readonly _dimStyleRecords: DxfDimStyle[] = [];

	public get dimStylesRecords(): DxfDimStyle[] {
		return this._dimStyleRecords;
	}

	public constructor() {
		super();
		this.softPointer = '0';
	}

	public stringify(): string {
		return this.manager.stringify();
	}

	public get manager(): TagsManager {
		const manager = new TagsManager();
		manager.entityType('TABLE');
		manager.name('DIMSTYLE');
		manager.addTag(105, this.handle);
		manager.subclassMarker('AcDbSymbolTable');
		manager.pushTag(this.softPointerTag());
		manager.subclassMarker('AcDbDimStyleTable');
		manager.addTag(70, this.dimStylesRecords.length);
		this.dimStylesRecords.forEach((dimStyleRecord) => {
			manager.appendTags(dimStyleRecord);
		});
		manager.entityType('ENDTAB');
		return manager;
	}

	public addDimStyle(name: string) {
		const dimStyle = new DxfDimStyle(name);
		dimStyle.softPointer = this.handle;
		this._dimStyleRecords.push(dimStyle);
		return dimStyle;
	}
}
