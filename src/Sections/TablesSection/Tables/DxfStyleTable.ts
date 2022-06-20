import DxfTable from '../DxfTable';
import DxfStyle from './Records/DxfStyle';
import TagsManager from '../../../Internals/TagsManager';

export default class DxfStyleTable extends DxfTable {
	styleRecords: DxfStyle[] = [];

	constructor() {
		super('STYLE');
	}

	addStyle(name: string, flags?: number): DxfStyle {
		const styleRecord = new DxfStyle(name, flags);
		styleRecord.ownerObject = this.handle;
		this.styleRecords.push(styleRecord);
		return styleRecord;
	}

	override get manager(): TagsManager {
		const manager = new TagsManager();
		this.maxNumberEntries = this.styleRecords.length;
		manager.push(super.manager.tags);
		this.styleRecords.forEach((styleRecord) => {
			manager.append(styleRecord);
		});
		manager.entityType('ENDTAB');
		return manager;
	}
}
