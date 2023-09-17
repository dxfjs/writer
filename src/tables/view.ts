import { Handle } from "@/utils";
import { Table } from "./table";

export class View extends Table {
  constructor(handle: Handle) {
    super("VIEW", handle);
  }
}
