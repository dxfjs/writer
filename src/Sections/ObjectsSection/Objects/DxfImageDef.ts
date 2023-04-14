import DxfDefinedApplication from 'Internals/DefinedApplication'
import { DxfObject } from '../DxfObject'
import { Dxfier } from 'Internals/Dxfier'
import { point2d } from 'Internals/Helpers'

export enum ImageDefResolutionUnits {
	NoUnits = 0,
	Centimeters = 2,
	Inch = 5,
}

export class DxfImageDef extends DxfObject {
  path: string
  acadImageDictHandle: string
  readonly imageReactorHandles: string[]
  width: number
  height: number
  widthPixelSize: number
  heightPixelSize: number
  loaded: boolean
  resolutionUnits: ImageDefResolutionUnits

  constructor(path: string) {
    super('IMAGEDEF')
    this.path = path
    this.acadImageDictHandle = ''
    this.imageReactorHandles = []
    this.width = 1
    this.height = 1
    this.widthPixelSize = 1
    this.heightPixelSize = 1
    this.loaded = true
    this.resolutionUnits = ImageDefResolutionUnits.NoUnits
  }

  addImageDefReactorHandle(id: string) {
    this.imageReactorHandles.push(id)
  }

  override dxfy(dx: Dxfier): void {
    super.dxfy(dx)
    // TODO Need a dynamic way
    const da = new DxfDefinedApplication('ACAD_REACTORS')
    da.add(330, this.acadImageDictHandle)
    for (const handle of this.imageReactorHandles) {
      da.add(330, handle)
    }
    da.dxfy(dx)
    dx.subclassMarker('AcDbRasterImageDef')
    dx.push(1, this.path)
    dx.point2d(point2d(this.width, this.height))
    dx.push(11, this.widthPixelSize)
    dx.push(21, this.heightPixelSize)
    dx.push(280, Number(this.loaded))
    dx.push(281, this.resolutionUnits)
  }
}
