import DxfDimStyle from './Records/DxfDimStyle';
import TagsManager, { tag_t } from '../../../Internals/TagsManager';
import Handle from '../../../Internals/Handle';

export default class DxfDimStyleTable extends Handle {
	private _dimStyleRecords: DxfDimStyle[] = [];

	get dimStylesRecords(): DxfDimStyle[] {
		return this._dimStyleRecords;
	}

	public constructor() {
		super();
	}

	public addDimStyle(name: string) {
		const dimStyle = new DxfDimStyle(name);
		dimStyle.softPointer = this.handle;
		this._dimStyleRecords.push(dimStyle);
		return dimStyle;
	}

	public tags(): tag_t[] {
		const manager = new TagsManager();

		manager.entityType('TABLE');
		manager.name('DIMSTYLE');
		manager.addTag(105, this.handle);
		manager.subclassMarker('AcDbSymbolTable');
		manager.pushTag(this.softPointerTag());
		manager.subclassMarker('AcDbDimStyleTable');

		manager.addTag(70, this.dimStylesRecords.length);

		this.dimStylesRecords.forEach((dimStyleRecord) => {
			manager.pushTags(dimStyleRecord.tags());
		});
		manager.entityType('ENDTAB');
		return manager.tags;
	}
}
