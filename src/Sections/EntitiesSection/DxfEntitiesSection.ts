import { DxfBlock } from '../BlocksSection/DxfBlock'
import { DxfInterface } from 'Internals/Interfaces'
import { Dxfier } from 'Internals/Dxfier'

export class DxfEntitiesSection implements DxfInterface {
  readonly modelSpace: DxfBlock

  constructor(modelSpace: DxfBlock) {
    this.modelSpace = modelSpace
  }

  setLayerName(layerName: string) {
    this.modelSpace.setLayerName(layerName)
  }

  dxfy(dx: Dxfier) {
    dx.start('ENTITIES')
    this.modelSpace.entities.forEach((e) => e.dxfy(dx))
    dx.end()
  }
}
