import DxfTable from '../DxfTable';
import DxfAppId from './Records/DxfAppId';
import TagsManager from '../../../Internals/TagsManager';

export default class AppIdTable extends DxfTable {
	static #instance: AppIdTable;
	readonly _appIdRecords: DxfAppId[] = [];

	get appIdRecords(): DxfAppId[] {
		return this._appIdRecords;
	}

	private constructor() {
		super('APPID');
	}

	static getInstance(): AppIdTable {
		if (!this.#instance) this.#instance = new AppIdTable();
		return this.#instance;
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
		manager.push(super.manager.tags);
		this.appIdRecords.forEach((appIdRecord) => {
			manager.append(appIdRecord);
		});
		manager.entityType('ENDTAB');
		return manager;
	}
}
