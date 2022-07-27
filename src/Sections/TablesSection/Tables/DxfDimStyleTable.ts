import DxfDimStyle from './Records/DxfDimStyle';
import TagsManager from '../../../Internals/TagsManager';
import DxfTable from '../DxfTable';

export default class DxfDimStyleTable extends DxfTable {
	readonly dimStyleRecords: DxfDimStyle[] = [];

	constructor() {
		super('DIMSTYLE');
		this.ownerObjectHandle = '0';
	}

	override get manager(): TagsManager {
		const manager = new TagsManager();
		this.maxNumberEntries = this.dimStyleRecords.length;
		manager.push(super.manager.tags);
		for (let i = 0; i < this.dimStyleRecords.length; i++) {
			manager.append(this.dimStyleRecords[i]);
		}
		manager.entityType('ENDTAB');
		return manager;
	}

	addDimStyle(name: string, flags?: number) {
		const dimStyle = new DxfDimStyle(name, flags);
		dimStyle.ownerObjectHandle = this.handle;
		this.dimStyleRecords.push(dimStyle);
		return dimStyle;
	}
}
