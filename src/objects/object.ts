import { AppDefined, Handle, TagsManager } from "@/utils";
import { Taggable } from "@/types";

export abstract class XObject implements Taggable {
  readonly handleSeed: string;

  readonly applications: AppDefined[];
  readonly reactors: AppDefined;
  readonly xdictionary: AppDefined;

  ownerObjectHandle: string;

  constructor(public readonly type: string, handle: Handle) {
    this.handleSeed = handle.next();
    this.ownerObjectHandle = "0";

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
    mg.add(5, this.handleSeed);
    this.applications.forEach((a) => a.tagify(mg));
    mg.add(330, this.ownerObjectHandle);
  }
}
