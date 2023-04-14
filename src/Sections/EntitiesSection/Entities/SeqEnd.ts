import Entity from '../Entity'

export class SeqEnd extends Entity {
  owner: string|undefined
  constructor() {
    super('SEQEND')
  }
}
