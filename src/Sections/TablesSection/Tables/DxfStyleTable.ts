import DxfTable from '../DxfTable';
import DxfStyle from './Records/DxfStyle';
import TagsManager from '../../../Internals/TagsManager';

export default class DxfStyleTable extends DxfTable {
	readonly styleRecords: DxfStyle[] = [];

	constructor() {
		super('STYLE');
	}

	addStyle(name: string, flags?: number): DxfStyle {
		const styleRecord = new DxfStyle(name, flags);
		styleRecord.ownerObjectHandle = this.handle;
		this.styleRecords.push(styleRecord);
		return styleRecord;
	}

	override get manager(): TagsManager {
		const manager = new TagsManager();
		this.maxNumberEntries = this.styleRecords.length;
		manager.push(super.manager.tags);
		for (let i = 0; i < this.styleRecords.length; i++) {
			manager.append(this.styleRecords[i]);
		}
		manager.entityType('ENDTAB');
		return manager;
	}
}
