import { AppIdFlags, DxfAppId } from './Records'
import { DxfTable } from '../DxfTable'

export class DxfAppIdTable extends DxfTable<DxfAppId> {
  constructor() {
    super('APPID')
  }

  addAppId(name: string, flags?: AppIdFlags) {
    const r = new DxfAppId(name, flags)
    r.ownerObjectHandle = this.handle
    this.records.push(r)
    return r
  }
}
