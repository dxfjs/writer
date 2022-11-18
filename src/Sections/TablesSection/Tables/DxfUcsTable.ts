import DxfTable from '../DxfTable'
import DxfUcs from './Records/DxfUcs'

export default class DxfUcsTable extends DxfTable<DxfUcs> {
  constructor() {
    super('UCS')
  }

  addUcs(name: string) {
    const r = new DxfUcs(name)
    r.ownerObjectHandle = this.handle
    this.records.push(r)
    return r
  }
}
