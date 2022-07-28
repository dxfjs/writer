import DxfDimStyle from './Records/DxfDimStyle';
import DxfTable from '../DxfTable';

export default class DxfDimStyleTable extends DxfTable<DxfDimStyle> {
	constructor() {
		super('DIMSTYLE');
		this.ownerObjectHandle = '0';
	}

	addDimStyle(name: string, flags?: number) {
		const r = new DxfDimStyle(name, flags);
		r.ownerObjectHandle = this.handle;
		this.records.push(r);
		return r;
	}
}
