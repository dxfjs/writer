import { Dxfier } from 'Internals/Dxfier'
import Handle from 'Internals/Handle'
import DxfInterface from 'Internals/Interfaces/DxfInterface'

export default class DxfEndBlk implements DxfInterface {
  readonly handle: string
  ownerObjectHandle?: string

  constructor() {
    this.handle = Handle.next()
  }

  dxfy(dx: Dxfier): void {
    dx.type('ENDBLK')
    dx.handle(this.handle)
    dx.push(330, this.ownerObjectHandle)
    dx.subclassMarker('AcDbEntity')
    dx.layerName('0') // TODO make this dynamic
    dx.subclassMarker('AcDbBlockEnd')
  }
}
