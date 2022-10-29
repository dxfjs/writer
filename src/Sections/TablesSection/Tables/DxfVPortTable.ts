import DxfTable from '../DxfTable'
import DxfVPort from './Records/DxfVPort'

export default class DxfVPortTable extends DxfTable<DxfVPort> {
  constructor() {
    super('VPORT')
  }

  addViewPort(name: string) {
    const r = new DxfVPort(name)
    r.ownerObjectHandle = this.handle
    this.records.push(r)
    return r
  }
}
