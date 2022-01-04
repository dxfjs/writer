import DxfTable from '../DxfTable';
import DxfAppId from './Records/DxfAppId';
import TagsManager from '../../../Internals/TagsManager';

export default class AppIdTable extends DxfTable {
	private readonly _appIdRecords: DxfAppId[] = [];

	get appIdRecords(): DxfAppId[] {
		return this._appIdRecords;
	}

	public constructor() {
		super('APPID');
	}

	public addAppId(name: string) {
		const appIdRecord = new DxfAppId(name);
		appIdRecord.softPointer = this.handle;
		this._appIdRecords.push(appIdRecord);
		return appIdRecord;
	}

	public get manager(): TagsManager {
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
