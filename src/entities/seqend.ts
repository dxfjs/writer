import { Entity } from "./entity";
import { Handle } from "@/utils";

export class SeqEnd extends Entity {
  override get subClassMarker(): string | undefined {
    return;
  }

  constructor(handle: Handle) {
    super("SEQEND", handle);
  }

  protected tagifyChild(): void {}
}
