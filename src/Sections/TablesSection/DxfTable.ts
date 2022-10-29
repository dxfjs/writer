import { Dxfier } from 'Internals/Dxfier'
import Handle from 'Internals/Handle'
import DxfInterface from 'Internals/Interfaces/DxfInterface'
import DxfRecord from './Tables/Records/DxfRecord'

export default abstract class DxfTable<T extends DxfRecord> implements DxfInterface {
  maxNumberEntries = 0
  readonly handle: string
  ownerObjectHandle: string
  readonly records: T[]

  public constructor(public name: string) {
    this.ownerObjectHandle = '0'
    this.handle = Handle.next()
    this.records = []
  }

  dxfy(dx: Dxfier) {
    dx.type('TABLE')
    dx.name(this.name)
    dx.handle(this.handle)
    dx.push(330, this.ownerObjectHandle)
    dx.subclassMarker('AcDbSymbolTable')
    dx.push(70, this.records.length)
    for (const record of this.records) record.dxfy(dx)
    dx.type('ENDTAB')
  }
}
