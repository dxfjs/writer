import { DxfRecord } from './DxfRecord'
import { Dxfier } from 'Internals/Dxfier'

export class DxfUcs extends DxfRecord {
  readonly name: string

  constructor(name: string) {
    super('UCS')
    this.name = name
  }

  override dxfy(dx: Dxfier): void {
    super.dxfy(dx)
  }
}
