import { Block, BlockOptions } from "./block";
import { OmitBlockRecord, OmitSeeder, Taggable, WithSeeder } from "@/types";
import { Seeder, TagsManager } from "@/utils";
import { Tables } from "@/tables";

export interface BlocksOptions {
  tables: Tables;
  seeder: Seeder;
}

export class Blocks implements Taggable, WithSeeder {
  readonly tables: Tables;
  readonly seeder: Seeder;
  readonly blocks: Block[];
  readonly modelSpace: Block;
  readonly paperSpace: Block;

  private paperSpaceSeed = 0;

  constructor({ tables, seeder }: BlocksOptions) {
    this.tables = tables;
    this.seeder = seeder;
    this.blocks = [];
    this.modelSpace = this.addBlock({ name: "*Model_Space" });
    this.paperSpace = this.addBlock({ name: "*Paper_Space" });
  }

  addBlock(options: OmitBlockRecord<OmitSeeder<BlockOptions>>) {
    const blockRecord = this.tables.addBlockRecord(options);
    const b = new Block({ ...options, ...this, blockRecord });
    b.ownerObjectHandle = blockRecord.handle;
    b.endblk.ownerObjectHandle = blockRecord.handle;
    this.blocks.push(b);
    return b;
  }

  get(name?: string) {
    if (name == null) return;
    return this.blocks.find(b => b.name === name);
  }

  addPaperSpace() {
    const name = `*Paper_Space${this.paperSpaceSeed++}`;
    return this.addBlock({ name });
  }

  tagify(mg: TagsManager): void {
    mg.sectionStart("BLOCKS");
    this.blocks.forEach((b) => b.tagify(mg));
    mg.sectionEnd();
  }
}
