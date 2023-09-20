import { Handle } from "@/utils";
import { XTable } from "./table";

export class Ucs extends XTable {
  constructor(handle: Handle) {
    super("UCS", handle);
  }
}
