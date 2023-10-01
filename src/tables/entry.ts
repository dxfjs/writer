import { AppDefined, TagsManager } from "@/utils";
import { Taggable, WithSeeder } from "@/types";

export const EntryCommonFlags = {
  None: 0,
  XRefDependent: 16,
  XRefResolved: 32,
  Referenced: 64,
} as const;

export interface EntryOptions extends WithSeeder {
  type: string;
  hcode?: number;
}

export abstract class Entry implements Taggable {
  readonly handle: string;
  private readonly type: string;
  ownerObjectHandle: string;

  protected hcode: number;

  readonly applications: AppDefined[];
  readonly reactors: AppDefined;
  readonly xdictionary: AppDefined;

  constructor({ seeder, type, hcode }: EntryOptions) {
    this.handle = seeder.next();
    this.type = type;
    this.ownerObjectHandle = "0";

    this.hcode = hcode ?? 5;

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
    mg.add(this.hcode, this.handle);
    this.applications.forEach((a) => a.tagify(mg));
    mg.add(330, this.ownerObjectHandle);
    mg.add(100, "AcDbSymbolTableRecord");
  }
}
