import { XHandle } from "../utils";
import { XTable } from "./table";

export class XVPort  extends XTable {
  constructor(handle: XHandle) {
    super("VPORT", handle);
  }
}
