import { Block, BlockOptions } from "./block";
import { Handle, TagsManager } from "../utils";
import { Tables } from "../tables";
import { Taggable } from "../types";

export class Blocks implements Taggable {
  readonly tables: Tables;
  readonly handle: Handle;
  readonly blocks: Block[];
  readonly modelSpace: Block;
  readonly paperSpace: Block;

  private paperSpaceSeed = 0;

  constructor(tables: Tables, handle: Handle) {
    this.tables = tables;
    this.handle = handle;
    this.blocks = [];
    this.modelSpace = this.addBlock({ name: "*Model_Space" });
    this.paperSpace = this.addBlock({ name: "*Paper_Space" });
  }

  addBlock(options: BlockOptions) {
    const br = this.tables.addBlockRecord({ name: options.name });
    const b = new Block(options, this.handle, br);
    this.blocks.push(b);
    return b;
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
