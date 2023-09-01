import { Handle } from "../utils";
import { Table } from "./table";

export class Ucs extends Table {
  constructor(handle: Handle) {
    super("UCS", handle);
  }
}
