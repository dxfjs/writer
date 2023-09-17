import { AppDefined, Handle, TagsManager } from "@/utils";
import { Taggable } from "@/types";

export const EntryCommonFlags = {
  None: 0,
  XRefDependent: 16,
  XRefResolved: 32,
  Referenced: 64,
} as const;

export abstract class Entry implements Taggable {
  readonly handleSeed: string;
  ownerObjectHandle: string;

  protected handleCode: number;

  readonly applications: AppDefined[];
  readonly reactors: AppDefined;
  readonly xdictionary: AppDefined;

  constructor(
    private readonly type: string,
    handle: Handle,
    handleCode?: number
  ) {
    this.handleSeed = handle.next();
    this.ownerObjectHandle = "0";

    this.handleCode = handleCode ?? 5;

    this.applications = [];
    this.reactors = this.addAppDefined("ACAD_REACTORS");
    this.xdictionary = this.addAppDefined("ACAD_XDICTIONARY");
  }

  addAppDefined(name: string) {
    const f = this.applications.find((a) => a.name === name);
    if (f) return f;

    const a = new AppDefined(name);
    this.applications.push(a);
    return a;
  }

  tagify(mg: TagsManager): void {
    mg.add(0, this.type);
    mg.add(this.handleCode, this.handleSeed);
    this.applications.forEach((a) => a.tagify(mg));
    mg.add(330, this.ownerObjectHandle);
    mg.add(100, "AcDbSymbolTableRecord");
  }
}
