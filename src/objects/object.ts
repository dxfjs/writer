import { AppDefined, TagsManager } from "@/utils";
import { Taggable, WithSeeder } from "@/types";

export interface ObjectOptions extends WithSeeder {
  type: string;
}

export abstract class XObject implements Taggable {
  readonly handleSeed: string;
  readonly type: string;

  readonly applications: AppDefined[];
  readonly reactors: AppDefined;
  readonly xdictionary: AppDefined;

  ownerObjectHandle: string;

  constructor({ seeder, type }: ObjectOptions) {
    this.handleSeed = seeder.next();
    this.type = type;
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
