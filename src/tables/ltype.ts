import { Entry, EntryCommonFlags } from "./entry";
import { Handle, TagsManager } from "@/utils";
import { Table } from "./table";

export interface LTypeOptions {
  name: string;
  flags?: number;
  descriptive?: string;
  elements?: number[];
}

export class LTypeEntry extends Entry {
  readonly name: string;
  flags: number;
  descriptive: string;
  readonly elements: number[];

  constructor(options: LTypeOptions, handle: Handle) {
    super("LTYPE", handle);
    this.name = options.name;
    this.flags = options.flags ?? EntryCommonFlags.None;
    this.descriptive = options.descriptive || "";
    this.elements = options.elements || [];
  }

  private patternLength() {
    return this.elements.reduce((prev, curr) => prev + Math.abs(curr), 0);
  }

  override tagify(mg: TagsManager): void {
    super.tagify(mg);
    mg.add(100, "AcDbLinetypeTableRecord");
    mg.add(2, this.name);
    mg.add(70, this.flags);
    mg.add(3, this.descriptive);
    mg.add(72, 65);
    mg.add(73, this.elements.length);
    mg.add(40, this.patternLength());
    this.elements.forEach((e) => {
      mg.add(49, e);
      mg.add(74, 0);
    });
  }
}

export class LType extends Table<LTypeEntry> {
  constructor(handle: Handle) {
    super("LTYPE", handle);
  }

  add(options: LTypeOptions) {
    return this.addEntry(new LTypeEntry(options, this.handle));
  }
}
