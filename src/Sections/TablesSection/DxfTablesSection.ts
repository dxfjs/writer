import {
  AppIdFlags,
  DimStyleFlags,
  DxfAppId,
  DxfAppIdTable,
  DxfBlockRecordTable,
  DxfDimStyle,
  DxfDimStyleTable,
  DxfLTypeTable,
  DxfLayer,
  DxfLayerTable,
  DxfStyle,
  DxfStyleTable,
  DxfUcs,
  DxfUcsTable,
  DxfVPort,
  DxfVPortTable,
  DxfView,
  DxfViewTable,
  LayerFlags,
  ViewArgs,
} from './Tables'
import { DxfInterface, Dxfier } from 'Internals'

export class DxfTablesSection implements DxfInterface {
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

  addLType(
    name: string,
    descriptive: string,
    elements: number[],
    flags?: number
  ) {
    return this.ltypeTable.addLType(name, descriptive, elements, flags)
  }

  addBlockRecord(name: string) {
    return this.blockRecordTable.addBlockRecord(name)
  }

  addLayer(
    name: string,
    color: number,
    lineType: string,
    flags?: LayerFlags
  ): DxfLayer {
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
