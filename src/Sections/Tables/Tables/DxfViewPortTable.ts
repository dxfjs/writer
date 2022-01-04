import DxfTable from '../DxfTable';
import DxfViewPort from './Records/DxfViewPort';
import TagsManager from '../../../Internals/TagsManager';

export default class DxfViewPortTable extends DxfTable {
	private readonly _viewPortRecords: DxfViewPort[] = [];

	public get viewPortRecords(): DxfViewPort[] {
		return this._viewPortRecords;
	}

	public constructor() {
		super('VPORT');
	}

	public addViewPort(name: string) {
		const viewPortRecord = new DxfViewPort(name);
		viewPortRecord.softPointer = this.handle;
		this._viewPortRecords.push(viewPortRecord);
		return viewPortRecord;
	}

	public get manager(): TagsManager {
		const manager = new TagsManager();
		this.maxNumberEntries = this.viewPortRecords.length;
		manager.pushTags(super.manager.tags);
		this.viewPortRecords.forEach((viewPortRecord) => {
			manager.appendTags(viewPortRecord);
		});
		manager.entityType('ENDTAB');
		return manager;
	}
}
