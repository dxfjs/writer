import { XAppDefined, XHandle, XTagsManager } from "../utils";
import { Taggable } from "../types";

export abstract class XObject implements Taggable {
  readonly handleSeed: string;

  readonly applications: XAppDefined[];
  readonly reactors: XAppDefined;
  readonly xdictionary: XAppDefined;

  ownerObjectHandle: string;

  constructor(public readonly type: string, handle: XHandle) {
    this.handleSeed = handle.next();
    this.ownerObjectHandle = "0";

    this.applications = [];
    this.reactors = this.addAppDefined("ACAD_REACTORS");
    this.xdictionary = this.addAppDefined("ACAD_XDICTIONARY");
  }

  addAppDefined(name: string) {
    const f = this.applications.find((a) => a.name === name);
    if (f) return f;

    const a = new XAppDefined(name);
    this.applications.push(a);
    return a;
  }

  tagify(mg: XTagsManager): void {
    mg.add(0, this.type);
    mg.add(5, this.handleSeed);
    this.applications.forEach((a) => a.tagify(mg));
    mg.add(330, this.ownerObjectHandle);
  }
}
