import { Dictionary, DuplicateRecordFlags } from "./dictionary";
import { Seeder, TagsManager } from "@/utils";
import { Taggable, WithSeeder } from "@/types";
import { XObject } from "./object";

export interface ObjectsOptions extends WithSeeder {}

export class Objects implements Taggable,WithSeeder {
  readonly seeder: Seeder;
  readonly objects: XObject[];
  readonly root: Dictionary;

  constructor({ seeder }: ObjectsOptions) {
    this.seeder = seeder;
    this.objects = [];
    this.root = new Dictionary(seeder);
    this.root.duplicateRecordFlag = DuplicateRecordFlags.KeepExisting;
    this.root.add("ACAD_GROUP", this.addDictionary().handleSeed);
  }

  add<O extends XObject>(obj: O) {
    this.objects.push(obj);
    return obj;
  }

  addDictionary() {
    const d = new Dictionary(this.seeder);
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
