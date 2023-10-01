import { WithSeeder } from "@/types";
import { XTable } from "./table";

export interface ViewTableOptions extends WithSeeder {}

export class View extends XTable {
  constructor(options: ViewTableOptions) {
    super({ seeder: options.seeder, name: "VIEW" });
  }
}
