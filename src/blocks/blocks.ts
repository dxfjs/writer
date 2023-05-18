import { BlockOptions, XBlock } from "./block";
import { XHandle, XTagsManager } from "../utils";
import { Taggable } from "../types";
import { XTables } from "../tables";

export class XBlocks implements Taggable {
  readonly tables: XTables;
  readonly handle: XHandle;
  readonly blocks: XBlock[];
  readonly modelSpace: XBlock;
  readonly paperSpace: XBlock;

  private paperSpaceSeed = 0;

  constructor(tables: XTables, handle: XHandle) {
    this.tables = tables;
    this.handle = handle;
    this.blocks = [];
    this.modelSpace = this.addBlock({ name: "*Model_Space" });
    this.paperSpace = this.addBlock({ name: "*Paper_Space" });
  }

  addBlock(options: BlockOptions) {
    const br = this.tables.addBlockRecord({ name: options.name });
    const b = new XBlock(options, this.handle, br);
    this.blocks.push(b);
    return b;
  }

  addPaperSpace() {
    const name = `*Paper_Space${this.paperSpaceSeed++}`;
    return this.addBlock({ name });
  }

  tagify(mg: XTagsManager): void {
    mg.sectionStart("BLOCKS");
    this.blocks.forEach((b) => b.tagify(mg));
    mg.sectionEnd();
  }
}
