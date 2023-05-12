import { DuplicateRecordFlags, XDictionary } from "./dictionary";
import { XHandle, XTagsManager } from "../utils";
import { Taggable } from "../types";
import { XObject } from "./object";

export class XObjects implements Taggable {
  readonly handle: XHandle;
  readonly objects: XObject[];
  readonly root: XDictionary;

  constructor(handle: XHandle) {
    this.handle = handle;
    this.objects = [];
    this.root = new XDictionary(handle);
    this.root.duplicateRecordFlag = DuplicateRecordFlags.KeepExisting;
    this.root.add("ACAD_GROUP", this.addDictionary().handleSeed);
  }

  add<O extends XObject>(objekt: O) {
    this.objects.push(objekt);
    return objekt;
  }

  addDictionary() {
    const d = new XDictionary(this.handle);
    d.ownerObjectHandle = this.root.handleSeed;
    return this.add(d);
  }

  tagify(mg: XTagsManager): void {
    mg.sectionStart("OBJECTS");
    this.root.tagify(mg);
    this.objects.forEach((o) => o.tagify(mg));
    mg.sectionEnd();
  }
}
