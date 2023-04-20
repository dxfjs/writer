import { DxfLayer, LayerFlags } from './Records'
import { DxfLTypeTable } from './DxfLTypeTable'
import { DxfTable } from '../DxfTable'
import { LineTypes } from 'Internals/Enums'
import { specialCharsRegex } from 'Internals/Utils'

export class DxfLayerTable extends DxfTable<DxfLayer> {
  readonly lTypeTable: DxfLTypeTable

  constructor(lineTypeTable: DxfLTypeTable) {
    super('LAYER')
    this.lTypeTable = lineTypeTable
  }

  addLayer(name: string, color: number, lineType: string, flags?: LayerFlags): DxfLayer {
    name = name.replace(specialCharsRegex, '')

    const layer = this.layer(name)
    if (layer) {
      return layer
    }

    if (!this.lTypeTable.exist(lineType)) {
      lineType = LineTypes.Continuous
    }

    const r = new DxfLayer(name, color, lineType, flags)
    r.ownerObjectHandle = this.handle
    this.records.push(r)
    return r
  }

  layer(name: string) {
    name = name.replace(specialCharsRegex, '')
    return this.records.find((layerRecord) => layerRecord.name === name)
  }

  exist(name: string) {
    return (
      this.records.find((layerRecord) => {
        return layerRecord.name === name
      }) !== undefined
    )
  }
}
