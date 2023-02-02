import DxfLType from './Records/DxfLType'
import DxfTable from '../DxfTable'

export default class DxfLTypeTable extends DxfTable<DxfLType> {
  constructor() {
    super('LTYPE')
  }

  exist(name: string): boolean {
    return (
      this.records.find((lineTypeRecord) => {
        return lineTypeRecord.name === name
      }) !== undefined
    )
  }

  ltype(name: string) {
    return this.records.find(r => r.name === name)
  }

  addLType(name: string, descriptive: string, elements: number[], flags?: number) {
    const found = this.ltype(name)
    if(found) {
      return found
    }
    const r = new DxfLType(name, descriptive, elements, flags)
    r.ownerObjectHandle = this.handle
    this.records.push(r)
    return r
  }
}
