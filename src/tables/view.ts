import { XHandle } from "../utils";
import { XTable } from "./table";

export class XView extends XTable {
  constructor(handle: XHandle) {
    super("VIEW", handle);
  }
}
