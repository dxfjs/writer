import { Handle } from "@/utils";
import { XTable } from "./table";

export class View extends XTable {
  constructor(handle: Handle) {
    super("VIEW", handle);
  }
}
