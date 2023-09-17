import { Entity } from "./entity";
import { Handle } from "@/utils";

export class SeqEnd extends Entity {
  constructor(handle: Handle) {
    super("SEQEND", handle);
  }
}
