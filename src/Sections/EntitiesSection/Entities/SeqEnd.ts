import { Dxfier } from 'Internals/index'
import Entity from '../Entity'

export class SeqEnd extends Entity {
  protected override dxfyChild(dx: Dxfier): void {}
  owner: string|undefined
  constructor() {
    super('SEQEND')
  }
}
