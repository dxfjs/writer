import { DxfView, ViewArgs } from './Records'
import { DxfTable } from '../DxfTable'

export class DxfViewTable extends DxfTable<DxfView> {
  constructor() {
    super('VIEW')
  }

  public addView(args: ViewArgs): DxfView {
    const r = new DxfView(args)
    r.ownerObjectHandle = this.handle
    this.records.push(r)
    return r
  }
}
