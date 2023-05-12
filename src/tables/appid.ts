import { XHandle, XTagsManager } from "../utils";
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

  constructor(options: AppIdOptions, handle: XHandle) {
    super("APPID", handle);
    this.name = options.name;
    this.flags = options.flags ?? AppIdFlags.None;
  }

  override tagify(mg: XTagsManager): void {
    super.tagify(mg);
    mg.add(100, "AcDbRegAppTableRecord");
    mg.add(2, this.name);
    mg.add(70, this.flags);
  }
}

export class XAppId extends XTable {
  constructor(handle: XHandle) {
    super("APPID", handle);
  }

  add(options: AppIdOptions) {
    return this.addEntry(new AppIdEntry(options, this.handle));
  }
}
