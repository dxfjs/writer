import { Handle, TagsManager } from "@/utils";
import { Entry } from "./entry";
import { XTable } from "./table";

export const AppIdFlags = {
  None: 0,
  XRefDependent: 16,
  XRefResolved: 32,
  Referenced: 64,
} as const;

export interface AppIdOptions {
  name: string;
  flags?: number;
}

export class AppIdEntry extends Entry {
  readonly name: string;
  flags: number;

  constructor(options: AppIdOptions, handle: Handle) {
    super("APPID", handle);
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

export class AppId extends XTable<AppIdEntry> {
  constructor(handle: Handle) {
    super("APPID", handle);
  }

  add(options: AppIdOptions) {
    return this.addEntry(new AppIdEntry(options, this.handle));
  }
}
