import DxfObject from '../DxfObject'
import { Dxfier } from 'Internals/Dxfier'

export default class DxfImageDefReactor extends DxfObject {
  classVersion: number
  imageHandle: string

  constructor(imageHandle: string) {
    super('IMAGEDEF_REACTOR')
    this.imageHandle = imageHandle
    this.classVersion = 2
  }

  override dxfy(dx: Dxfier): void {
    super.dxfy(dx)
    dx.subclassMarker('AcDbRasterImageDefReactor')
    dx.push(90, this.classVersion)
    dx.push(330, this.imageHandle)
  }
}
