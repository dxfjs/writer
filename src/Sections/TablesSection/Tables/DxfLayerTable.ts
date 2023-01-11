import DxfLTypeTable from './DxfLTypeTable'
import { DxfLayer } from './Records/DxfLayer'
import DxfTable from '../DxfTable'
import { LayerFlags } from './Records/DxfRecord'
import { specialCharsRegex } from 'Internals/Utils'

export default class DxfLayerTable extends DxfTable<DxfLayer> {
  readonly lTypeTable: DxfLTypeTable

  constructor(lineTypeTable: DxfLTypeTable) {
    super('LAYER')
    this.lTypeTable = lineTypeTable
  }

  addLayer(name: string, color: number, lineType: string, flags?: LayerFlags): DxfLayer {
    name = name.replace(specialCharsRegex, '')
    if (this.exist(name)) throw new Error(`The ${name} Layer already exist!`)
    if (!this.lTypeTable.exist(lineType))
      throw new Error(`The ${name} LineType doesn't exist!`)
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
