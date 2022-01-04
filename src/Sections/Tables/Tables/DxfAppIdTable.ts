import DxfTable from '../DxfTable';
import DxfAppId from './Records/DxfAppId';
import TagsManager, { tag_t } from '../../../Internals/TagsManager';

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

	public tags(): tag_t[] {
		const manager = new TagsManager();
		this.maxNumberEntries = this.appIdRecords.length;
		manager.pushTags(super.tags());
		this.appIdRecords.forEach((appIdRecord) => {
			manager.pushTags(appIdRecord.tags());
		});
		manager.entityType('ENDTAB');
		return manager.tags;
	}
}
