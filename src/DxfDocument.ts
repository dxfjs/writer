import {
  AppIdFlags,
  DxfBlock,
  DxfBlocksSection,
  DxfClassesSection,
  DxfDimStyle,
  DxfEntitiesSection,
  DxfHeaderSection,
  DxfLayer,
  DxfObjectsSection,
  DxfStyle,
  DxfTablesSection,
  DxfVPort,
} from 'Sections'
import { Colors, Units } from 'Internals'
import { DxfInterface, Dxfier } from 'Internals'
import Handle from 'Internals/Handle'
import { name as packageName } from '../package.json'
import { specialCharsRegex } from 'Internals/Utils'
import { vec3_t } from 'Internals/Helpers'

export class DxfDocument implements DxfInterface {
  readonly header: DxfHeaderSection
  readonly classes: DxfClassesSection
  readonly tables: DxfTablesSection
  readonly blocks: DxfBlocksSection
  readonly entities: DxfEntitiesSection
  readonly objects: DxfObjectsSection

  readonly modelSpace: DxfBlock
  readonly paperSpace: DxfBlock

  readonly activeVPort: DxfVPort
  readonly styleStandard: DxfStyle
  readonly dimStyleStandard: DxfDimStyle

  currentLayerName: string
  currentUnits: Units

  constructor() {
    Handle.clear()
    this.header = new DxfHeaderSection()
    this.classes = new DxfClassesSection()
    this.tables = new DxfTablesSection()
    this.objects = new DxfObjectsSection()
    this.blocks = new DxfBlocksSection(this.tables, this.objects)
    this.entities = new DxfEntitiesSection(this.blocks.modelSpace)
    this.currentLayerName = DxfLayer.layerZeroName
    this.currentUnits = Units.Unitless

    this.header.setVariable('$ACADVER', { 1: 'AC1021' })
    this.header.setVariable('$LASTSAVEDBY', { 1: packageName })
    this._handseed()
    this.setUnits(Units.Unitless)
    this.tables.addLType('ByBlock', '', [])
    this.tables.addLType('ByLayer', '', [])
    const ltc = this.tables.addLType('Continuous', 'Solid line', [])
    this.tables.addLayer(DxfLayer.layerZeroName, Colors.White, ltc.name)
    this.styleStandard = this.tables.addStyle('Standard')
    this.tables.addAppId('ACAD', AppIdFlags.None)
    this.dimStyleStandard = this.tables.addDimStyle('Standard')
    this.dimStyleStandard.DIMTXSTY = this.styleStandard.handle
    this.activeVPort = this.tables.addVPort('*Active')

    this.modelSpace = this.blocks.modelSpace
    this.paperSpace = this.blocks.paperSpace
    this.setZeroLayerAsCurrent()
  }

  dxfy(dx: Dxfier): void {
    this.header.dxfy(dx)
    this.classes.dxfy(dx)
    this.tables.dxfy(dx)
    this.blocks.dxfy(dx)
    this.entities.dxfy(dx)
    this.objects.dxfy(dx)
  }

  addBlock(name: string) {
    return this.blocks.addBlock(name, this.objects)
  }

  setZeroLayerAsCurrent() {
    this.setCurrentLayerName(DxfLayer.layerZeroName)
  }

  setCurrentLayerName(name: string): void {
    this.currentLayerName = name.replace(specialCharsRegex, '')
    this.entities.setLayerName(this.currentLayerName)
    this.setCLayerVariable()
  }

  private _handseed() {
    this.header.setVariable('$HANDSEED', { 5: Handle.peek() })
  }

  setUnits(units: Units) {
    this.currentUnits = units
    this.header.setVariable('$INSUNITS', { 70: this.currentUnits })
  }

  private setCLayerVariable() {
    this.header.setVariable('$CLAYER', { 8: this.currentLayerName })
  }

  setViewCenter(center: vec3_t) {
    this.header.setVariable('$VIEWCTR', {
      10: center.x,
      20: center.y,
    })
    this.activeVPort.viewCenter = [center.x, center.y]
  }

  stringify(): string {
    const dx = new Dxfier()
    this._handseed()
    this.setViewCenter(this.modelSpace.centerView()) // fit in
    this.activeVPort.viewHeight = this.modelSpace.viewHeight()
    this.dxfy(dx)
    return dx.stringify()
  }
}
