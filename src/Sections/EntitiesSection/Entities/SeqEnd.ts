import Entity from '../Entity'

export default class SeqEnd extends Entity {
  owner: string|undefined
  constructor() {
    super('SEQEND')
  }
}
