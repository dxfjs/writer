import { DxfBlock, DxfBlocksSection } from '../BlocksSection'
import { DxfInterface } from 'Internals/Interfaces'
import { Dxfier } from 'Internals/Dxfier'

export class DxfEntitiesSection implements DxfInterface {
  readonly blocks: DxfBlocksSection
  readonly modelSpace: DxfBlock

  constructor(blocks: DxfBlocksSection) {
    this.blocks = blocks
    this.modelSpace = blocks.modelSpace
  }

  setLayerName(layerName: string) {
    this.modelSpace.setLayerName(layerName)
  }

  dxfy(dx: Dxfier) {
    dx.start('ENTITIES')
    this.modelSpace.entities.forEach((e) => e.dxfy(dx))
    this.blocks.blocks.forEach((b) => {
      if (b.isPaperSpace) {
        b.entities.forEach((e) => {
          e.inPaperSpace = true
          e.dxfy(dx)
        })
      }
    })
    dx.end()
  }
}
