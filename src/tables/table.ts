import { AppDefined, Seeder, TagsManager } from "@/utils";
import { Taggable, WithSeeder } from "@/types";
import { Entry } from "./entry";

export interface XTableOptions extends WithSeeder {
  name: string;
}

export class XTable<E extends Entry = Entry> implements Taggable {
  readonly seeder: Seeder;
  readonly name: string;
  readonly handle: string;
  ownerObjectHandle: string;
  protected entries: E[];

  readonly xdictionary: AppDefined;

  constructor(options: XTableOptions) {
    this.seeder = options.seeder;
    this.name = options.name;
    this.handle = this.seeder.next();
    this.ownerObjectHandle = "0";
    this.entries = [];
    this.xdictionary = new AppDefined("ACAD_XDICTIONARY");
  }

  addEntry<O>(ctor: new (options: WithSeeder<O>) => E, options: O) {
    const entry = new ctor({ seeder: this.seeder, ...options });
    entry.ownerObjectHandle = this.handle;
    this.entries.push(entry);
    return entry;
  }

  find(predicate: (value: E, index: number, obj: E[]) => unknown) {
    return this.entries.find(predicate);
  }

  tagify(mg: TagsManager): void {
    mg.add(0, "TABLE");
    mg.add(2, this.name);
    mg.add(5, this.handle);
    this.xdictionary.tagify(mg);
    mg.add(330, this.ownerObjectHandle);
    mg.add(100, "AcDbSymbolTable");
    mg.add(70, this.entries.length);
    this.entries.forEach((e) => e.tagify(mg));
    mg.add(0, "ENDTAB");
  }
}
