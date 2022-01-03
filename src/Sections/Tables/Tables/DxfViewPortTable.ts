import DxfTable from '../DxfTable';
import DxfViewPort from './Records/DxfViewPort';
import TagsManager, { tag_t } from '../../../Internals/TagsManager';

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
		viewPortRecord.addSoftPointer(this.handle);
		this._viewPortRecords.push(viewPortRecord);
		return viewPortRecord;
	}

	public tags(): tag_t[] {
		const manager = new TagsManager();
		this.maxNumberEntries = this.viewPortRecords.length;
		manager.pushTags(super.tags());
		this.viewPortRecords.forEach((viewPortRecord) => {
			manager.pushTags(viewPortRecord.tags());
		});
		manager.entityType('ENDTAB');
		return manager.tags;
	}
}
