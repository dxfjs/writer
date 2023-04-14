import DxfAppId, { AppIdFlags } from './Tables/Records/DxfAppId'
import DxfDimStyle, { DimStyleFlags } from './Tables/Records/DxfDimStyle'
import DxfView, { ViewArgs } from './Tables/Records/DxfView'

import DxfAppIdTable from './Tables/DxfAppIdTable'
import DxfBlockRecordTable from './Tables/DxfBlockRecordTable'
import DxfDimStyleTable from './Tables/DxfDimStyleTable'
import { DxfInterface } from 'Internals/Interfaces'
import DxfLTypeTable from './Tables/DxfLTypeTable'
import { DxfLayer } from './Tables/Records/DxfLayer'
import DxfLayerTable from './Tables/DxfLayerTable'
import DxfStyle from './Tables/Records/DxfStyle'
import DxfStyleTable from './Tables/DxfStyleTable'
import DxfUcs from './Tables/Records/DxfUcs'
import DxfUcsTable from './Tables/DxfUcsTable'
import DxfVPort from './Tables/Records/DxfVPort'
import DxfVPortTable from './Tables/DxfVPortTable'
import DxfViewTable from './Tables/DxfViewTable'
import { Dxfier } from 'Internals/Dxfier'
import { LayerFlags } from './Tables/Records/DxfRecord'

export default class DxfTablesSection implements DxfInterface {
  readonly vPortTable: DxfVPortTable
  readonly ltypeTable: DxfLTypeTable
  readonly layerTable: DxfLayerTable
  readonly styleTable: DxfStyleTable
  readonly viewTable: DxfViewTable
  readonly ucsTable: DxfUcsTable
  readonly appIdTable: DxfAppIdTable
  readonly dimStyleTable: DxfDimStyleTable
  readonly blockRecordTable: DxfBlockRecordTable

  constructor() {
    this.vPortTable = new DxfVPortTable()
    this.ltypeTable = new DxfLTypeTable()
    this.layerTable = new DxfLayerTable(this.ltypeTable)
    this.styleTable = new DxfStyleTable()
    this.viewTable = new DxfViewTable()
    this.ucsTable = new DxfUcsTable()
    this.appIdTable = new DxfAppIdTable()
    this.dimStyleTable = new DxfDimStyleTable()
    this.blockRecordTable = new DxfBlockRecordTable()
  }

  layer(name: string) {
    return this.layerTable.layer(name)
  }

  addLType(name: string, descriptive: string, elements: number[], flags?: number) {
    return this.ltypeTable.addLType(name, descriptive, elements, flags)
  }

  addBlockRecord(name: string) {
    return this.blockRecordTable.addBlockRecord(name)
  }

  addLayer(name: string, color: number, lineType: string, flags?: LayerFlags): DxfLayer {
    return this.layerTable.addLayer(name, color, lineType, flags)
  }

  addStyle(name: string): DxfStyle {
    return this.styleTable.addStyle(name)
  }

  addView(args: ViewArgs): DxfView {
    return this.viewTable.addView(args)
  }

  addUcs(name: string): DxfUcs {
    return this.ucsTable.addUcs(name)
  }

  addAppId(name: string, flags?: AppIdFlags): DxfAppId {
    return this.appIdTable.addAppId(name, flags)
  }

  addDimStyle(name: string, flags?: DimStyleFlags): DxfDimStyle {
    return this.dimStyleTable.addDimStyle(name, flags)
  }

  addVPort(name: string): DxfVPort {
    return this.vPortTable.addViewPort(name)
  }

  dxfy(dx: Dxfier) {
    dx.start('TABLES')
    this.vPortTable.dxfy(dx)
    this.ltypeTable.dxfy(dx)
    this.layerTable.dxfy(dx)
    this.styleTable.dxfy(dx)
    this.viewTable.dxfy(dx)
    this.ucsTable.dxfy(dx)
    this.appIdTable.dxfy(dx)
    this.dimStyleTable.dxfy(dx)
    this.blockRecordTable.dxfy(dx)
    dx.end()
  }
}
