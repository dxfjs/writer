import { WithSeeder } from "@/types";
import { XTable } from "./table";

export interface UcsTableOptions extends WithSeeder {}

export class Ucs extends XTable {
  constructor(options: UcsTableOptions) {
    super({ seeder: options.seeder, name: "UCS" });
  }
}
