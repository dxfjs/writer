import DxfTable from '../DxfTable';
import DxfAppId from './Records/DxfAppId';
import TagsManager from '../../../Internals/TagsManager';

export default class AppIdTable extends DxfTable {
	private static _instance: AppIdTable;
	private readonly _appIdRecords: DxfAppId[] = [];

	public get appIdRecords(): DxfAppId[] {
		return this._appIdRecords;
	}

	private constructor() {
		super('APPID');
	}

	public static getInstance(): AppIdTable {
		if (!this._instance) this._instance = new AppIdTable();
		return this._instance;
	}

	public addAppId(name: string, flags?: number) {
		const appIdRecord = new DxfAppId(name, flags);
		appIdRecord.softPointer = this.handle;
		this._appIdRecords.push(appIdRecord);
		return appIdRecord;
	}

	public override get manager(): TagsManager {
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
