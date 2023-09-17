import { Dictionary, DuplicateRecordFlags } from "./dictionary";
import { Handle, TagsManager } from "@/utils";
import { Taggable } from "@/types";
import { XObject } from "./object";

export class Objects implements Taggable {
  readonly handle: Handle;
  readonly objects: XObject[];
  readonly root: Dictionary;

  constructor(handle: Handle) {
    this.handle = handle;
    this.objects = [];
    this.root = new Dictionary(handle);
    this.root.duplicateRecordFlag = DuplicateRecordFlags.KeepExisting;
    this.root.add("ACAD_GROUP", this.addDictionary().handleSeed);
  }

  add<O extends XObject>(objekt: O) {
    this.objects.push(objekt);
    return objekt;
  }

  addDictionary() {
    const d = new Dictionary(this.handle);
    d.ownerObjectHandle = this.root.handleSeed;
    return this.add(d);
  }

  tagify(mg: TagsManager): void {
    mg.sectionStart("OBJECTS");
    this.root.tagify(mg);
    this.objects.forEach((o) => o.tagify(mg));
    mg.sectionEnd();
  }
}
