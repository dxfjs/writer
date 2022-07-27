import DxfTable from '../DxfTable';
import DxfAppId, { AppIdFlags } from './Records/DxfAppId';
import TagsManager from '../../../Internals/TagsManager';

export default class AppIdTable extends DxfTable {
	readonly appIdRecords: DxfAppId[] = [];

	constructor() {
		super('APPID');
	}

	addAppId(name: string, flags?: AppIdFlags) {
		const appIdRecord = new DxfAppId(name, flags);
		appIdRecord.ownerObjectHandle = this.handle;
		this.appIdRecords.push(appIdRecord);
		return appIdRecord;
	}

	override get manager(): TagsManager {
		const manager = new TagsManager();
		this.maxNumberEntries = this.appIdRecords.length;
		manager.push(super.manager.tags);
		for (let i = 0; i < this.appIdRecords.length; i++) {
			manager.append(this.appIdRecords[i]);
		}
		manager.entityType('ENDTAB');
		return manager;
	}
}
