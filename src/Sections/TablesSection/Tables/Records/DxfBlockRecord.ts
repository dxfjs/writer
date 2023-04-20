import { DxfRecord } from './DxfRecord'
import { Dxfier } from 'Internals/Dxfier'

export class DxfBlockRecord extends DxfRecord {
  readonly name: string
  insertionUnits: number
  explodability: number
  scalability: number
  layoutObject?: string

  constructor(name: string) {
    super('BLOCK_RECORD')
    this.name = name
    this.insertionUnits = 0
    this.explodability = 1
    this.scalability = 0
  }

  override dxfy(dx: Dxfier): void {
    super.dxfy(dx)
    dx.subclassMarker('AcDbBlockTableRecord')
    dx.name(this.name)
    dx.push(340, this.layoutObject)
    dx.push(70, this.insertionUnits)
    dx.push(280, this.explodability)
    dx.push(281, this.scalability)
  }
}
