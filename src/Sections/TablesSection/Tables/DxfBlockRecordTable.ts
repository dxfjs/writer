import DxfTable from '../DxfTable'
import DxfBlockRecord from './Records/DxfBlockRecord'

export default class DxfBlockRecordTable extends DxfTable<DxfBlockRecord> {
  constructor() {
    super('BLOCK_RECORD')
  }

  addBlockRecord(name: string) {
    const r = new DxfBlockRecord(name)
    r.ownerObjectHandle = this.handle
    this.records.push(r)
    return r
  }
}
