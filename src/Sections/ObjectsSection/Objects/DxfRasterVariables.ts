import DxfObject from '../DxfObject'
import { Dxfier } from 'Internals/Dxfier'

export default class DxfRasterVariables extends DxfObject {
  constructor() {
    super('RASTERVARIABLES')
  }

  override dxfy(dx: Dxfier): void {
    super.dxfy(dx)
    dx.subclassMarker('AcDbRasterVariables')
    dx.push(70, 0)
    dx.push(71, 1)
    dx.push(72, 0)
  }
}
