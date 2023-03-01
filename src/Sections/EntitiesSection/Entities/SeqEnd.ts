import { Dxfier } from '../../../Internals/Dxfier'
import Entity from '../Entity'

export default class SeqEnd extends Entity {
  owner: string|undefined
  constructor(owner?: string) {
    super('SEQEND')
    this.owner = owner || undefined
  }

  override dxfy(dx: Dxfier): void {
    super.dxfy(dx, this.owner)
  }
}
