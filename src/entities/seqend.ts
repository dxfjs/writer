import { Entity, EntityOptions } from "./entity";

export interface SeqEndOptions extends EntityOptions {}

export class SeqEnd extends Entity {
  override get subClassMarker(): string | undefined {
    return;
  }

  constructor(options: SeqEndOptions) {
    super(options);
    this._type = "SEQEND";
  }

  protected tagifyChild(): void {}
}
