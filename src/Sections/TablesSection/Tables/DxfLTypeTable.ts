import DxfTable from '../DxfTable'
import DxfLType from './Records/DxfLType'

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

  addLType(name: string, descriptive: string, elements: number[], flags?: number) {
    if (this.exist(name)) throw new Error(`The ${name} LType already exist!`)
    const r = new DxfLType(name, descriptive, elements, flags)
    r.ownerObjectHandle = this.handle
    this.records.push(r)
    return r
  }
}
