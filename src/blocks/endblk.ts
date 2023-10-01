import { AppDefined, TagsManager } from "@/utils";
import { Taggable, WithSeeder } from "@/types";

export interface EndBlkOptions extends WithSeeder {}

export class EndBlk implements Taggable {
  readonly handle: string;

  readonly applications: AppDefined[];

  ownerObjectHandle: string;
  layerName: string;

  constructor({ seeder }: EndBlkOptions) {
    this.handle = seeder.next();

    this.applications = [];

    this.ownerObjectHandle = "0";
    this.layerName = "0";
  }

  addAppDefined(name: string) {
    const f = this.applications.find((a) => a.name === name);
    if (f) return f;

    const a = new AppDefined(name);
    this.applications.push(a);
    return a;
  }

  tagify(mg: TagsManager): void {
    mg.add(0, "ENDBLK");
    mg.add(5, this.handle);
    this.applications.forEach((a) => a.tagify(mg));
    mg.add(330, this.ownerObjectHandle);
    mg.add(100, "AcDbEntity");
    mg.add(8, this.layerName);
    mg.add(100, "AcDbBlockEnd");
  }
}
