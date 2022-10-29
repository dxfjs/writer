import DxfTable from '../DxfTable'
import DxfView, { ViewArgs } from './Records/DxfView'

export default class DxfViewTable extends DxfTable<DxfView> {
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
