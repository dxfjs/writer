import { DxfBlockRecord } from './Records'
import { DxfTable } from '../DxfTable'

export class DxfBlockRecordTable extends DxfTable<DxfBlockRecord> {
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
