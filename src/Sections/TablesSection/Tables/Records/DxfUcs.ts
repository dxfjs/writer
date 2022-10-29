import { Dxfier } from 'Internals/Dxfier'
import DxfRecord from './DxfRecord'

export default class DxfUcs extends DxfRecord {
  readonly name: string

  constructor(name: string) {
    super('UCS')
    this.name = name
  }

  override dxfy(dx: Dxfier): void {
    super.dxfy(dx)
  }
}
