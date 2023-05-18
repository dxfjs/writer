import { DxfBlock, DxfBlocksSection } from '../BlocksSection'
import { DxfInterface } from 'Internals/Interfaces'
import { Dxfier } from 'Internals/Dxfier'

export class DxfEntitiesSection implements DxfInterface {
  readonly blocks: DxfBlocksSection
  readonly modelSpace: DxfBlock
  readonly paperSpace: DxfBlock

  constructor(blocks: DxfBlocksSection) {
    this.blocks = blocks
    this.modelSpace = blocks.modelSpace
    this.paperSpace = blocks.paperSpace
  }

  setLayerName(layerName: string) {
    this.modelSpace.setLayerName(layerName)
  }

  dxfy(dx: Dxfier) {
    dx.start('ENTITIES')
    this.paperSpace.entities.forEach((e) => e.dxfy(dx))
    this.modelSpace.entities.forEach((e) => e.dxfy(dx))
    dx.end()
  }
}
