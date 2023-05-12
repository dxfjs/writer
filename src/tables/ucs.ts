import { XHandle } from "../utils";
import { XTable } from "./table";

export class XUcs extends XTable {
  constructor(handle: XHandle) {
    super("UCS", handle);
  }
}
