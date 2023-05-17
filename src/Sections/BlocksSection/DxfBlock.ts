import { point3d, vec3_t } from 'Internals/Helpers'
import { DxfEndBlk } from './DxfEndBlk'
import { DxfObjectsSection } from 'ObjectsSection/DxfObjectsSection'
import { Dxfier } from 'Internals/Dxfier'
import { EntitiesManager } from 'EntitiesSection/EntitiesManager'

export enum BlockFlags {
  None = 0,
  AnonymousBlock = 1,
  HasNonConstantAttribute = 2,
  XRef = 4,
  XRefOverlay = 8,
  ExternallyDependent = 16,
  ResolvedXRef = 32,
  ReferencedXRef = 64,
}

export class DxfBlock extends EntitiesManager {
  readonly name: string
  readonly endBlk: DxfEndBlk
  ownerObjectHandle?: string
  flags: BlockFlags
  basePoint: vec3_t
  xrefPathName: string

  get isPaperSpace() {
    return this.name.startsWith('*Paper_Space')
  }

  get isModelSpace() {
    return this.name.startsWith('*Model_Space')
  }

  get isModelOrPaperSpace() {
    return this.isModelSpace || this.isPaperSpace
  }

  constructor(name: string, objects: DxfObjectsSection) {
    super(objects, '0')
    this.name = name
    this.flags = BlockFlags.None
    this.endBlk = new DxfEndBlk()
    this.basePoint = point3d(0, 0, 0)
    this.xrefPathName = ''
  }

  setLayerName(layerName: string) {
    this.layerName = layerName
  }

  override dxfy(dx: Dxfier): void {
    dx.type('BLOCK')
    dx.handle(this.handle)
    dx.push(330, this.ownerObjectHandle)
    dx.subclassMarker('AcDbEntity')
    dx.layerName(this.layerName)
    dx.subclassMarker('AcDbBlockBegin')
    dx.name(this.name)
    dx.push(70, this.flags)
    dx.point3d(this.basePoint)
    dx.name(this.name, 3)
    dx.push(1, this.xrefPathName)
    if (!this.isModelOrPaperSpace) super.dxfy(dx)
    this.endBlk.dxfy(dx)
  }
}
