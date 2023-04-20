import { DxfStyle } from './Records'
import { DxfTable } from '../DxfTable'

export class DxfStyleTable extends DxfTable<DxfStyle> {
  constructor() {
    super('STYLE')
  }

  addStyle(name: string, flags?: number): DxfStyle {
    const r = new DxfStyle(name, flags)
    r.ownerObjectHandle = this.handle
    this.records.push(r)
    return r
  }
}
