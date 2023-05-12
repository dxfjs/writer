import { XAppDefined, XHandle, XTagsManager } from "../utils";
import { Taggable } from "../types";

export class XEndBlk implements Taggable {
  readonly handleSeed: string;

  readonly applications: XAppDefined[];

  ownerObjectHandle: string;
  layerName: string;

  constructor(handle: XHandle) {
    this.handleSeed = handle.next();

    this.applications = [];

    this.ownerObjectHandle = "0";
    this.layerName = "0";
  }

  addAppDefined(name: string) {
    const f = this.applications.find((a) => a.name === name);
    if (f) return f;

    const a = new XAppDefined(name);
    this.applications.push(a);
    return a;
  }

  tagify(mg: XTagsManager): void {
    mg.add(0, "ENDBLK");
    mg.add(5, this.handleSeed);
    this.applications.forEach((a) => a.tagify(mg));
    mg.add(330, this.ownerObjectHandle);
    mg.add(100, "AcDbEntity");
    mg.add(8, this.layerName);
    mg.add(100, "AcDbBlockEnd");
  }
}
