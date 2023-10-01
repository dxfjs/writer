import { OmitSeeder, WithSeeder } from "@/types";
import { Entry } from "./entry";
import { TagsManager } from "@/utils";
import { XTable } from "./table";

export const AppIdFlags = {
  None: 0,
  XRefDependent: 16,
  XRefResolved: 32,
  Referenced: 64,
} as const;

export interface AppIdOptions extends WithSeeder {
  name: string;
  flags?: number;
}

export class AppIdEntry extends Entry {
  readonly name: string;
  flags: number;

  constructor(options: AppIdOptions) {
    super({ seeder: options.seeder, type: "APPID" });
    this.name = options.name;
    this.flags = options.flags ?? AppIdFlags.None;
  }

  override tagify(mg: TagsManager): void {
    super.tagify(mg);
    mg.add(100, "AcDbRegAppTableRecord");
    mg.add(2, this.name);
    mg.add(70, this.flags);
  }
}

export interface AppIdTableOptions extends WithSeeder {}

export class AppId extends XTable<AppIdEntry> {
  constructor(options: AppIdTableOptions) {
    super({ seeder: options.seeder, name: "APPID" });
  }

  add(options: OmitSeeder<AppIdOptions>) {
    return this.addEntry(AppIdEntry, options);
  }
}
