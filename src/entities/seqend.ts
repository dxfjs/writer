import { XEntity } from "./entity";
import { XHandle } from "../utils";

export class XSeqEnd extends XEntity {
  constructor(handle: XHandle) {
    super("SEQEND", handle);
  }
}
