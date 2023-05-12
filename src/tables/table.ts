import { XAppDefined, XHandle, XTagsManager } from "../utils";
import { Entry } from "./entry";
import { Taggable } from "../types";

export class XTable implements Taggable {
  readonly handle: XHandle;
  readonly handleSeed: string;
  ownerObjectHandle: string;
  protected entries: Entry[];

  readonly xdictionary: XAppDefined;

  constructor(public readonly name: string, handle: XHandle) {
    this.handle = handle;
    this.handleSeed = handle.next();
    this.ownerObjectHandle = "0";
    this.entries = [];
    this.xdictionary = new XAppDefined("ACAD_XDICTIONARY");
  }

  addEntry<E extends Entry>(entry: E) {
    entry.ownerObjectHandle = this.handleSeed;
    this.entries.push(entry);
    return entry;
  }

  tagify(mg: XTagsManager): void {
    mg.add(0, "TABLE");
    mg.add(2, this.name);
    mg.add(5, this.handleSeed);
    this.xdictionary.tagify(mg);
    mg.add(330, this.ownerObjectHandle);
    mg.add(100, "AcDbSymbolTable");
    mg.add(70, this.entries.length);
    this.entries.forEach((e) => e.tagify(mg));
    mg.add(0, "ENDTAB");
  }
}
