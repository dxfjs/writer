import DxfTable from '../DxfTable';
import DxfAppId from './Records/DxfAppId';
import TagsManager from '../../../Internals/TagsManager';

export default class AppIdTable extends DxfTable {
	readonly _appIdRecords: DxfAppId[] = [];

	get appIdRecords(): DxfAppId[] {
		return this._appIdRecords;
	}

	constructor() {
		super('APPID');
	}

	addAppId(name: string, flags?: number) {
		const appIdRecord = new DxfAppId(name, flags);
		appIdRecord.ownerObject = this.handle;
		this._appIdRecords.push(appIdRecord);
		return appIdRecord;
	}

	override get manager(): TagsManager {
		const manager = new TagsManager();
		this.maxNumberEntries = this.appIdRecords.length;
		manager.pushTags(super.manager.tags);
		this.appIdRecords.forEach((appIdRecord) => {
			manager.appendTags(appIdRecord);
		});
		manager.entityType('ENDTAB');
		return manager;
	}
}
