import { BlockOptions, XBlock } from "./block";
import { XHandle, XTagsManager } from "../utils";
import { Taggable } from "../types";

export class XBlocks implements Taggable {
  readonly handle: XHandle;
  readonly blocks: XBlock[];
  readonly modelSpace: XBlock;
  readonly paperSpace: XBlock;

  constructor(handle: XHandle) {
    this.handle = handle;
    this.blocks = [];
    this.modelSpace = this.addBlock({ name: "*Model_Space" });
    this.paperSpace = this.addBlock({ name: "*Paper_Space" });
  }

  addBlock(options: BlockOptions) {
    const b = new XBlock(options, this.handle);
    this.blocks.push(b);
    return b;
  }

  tagify(mg: XTagsManager): void {
    mg.sectionStart("BLOCKS");
    this.blocks.forEach((b) => b.tagify(mg));
    mg.sectionEnd();
  }
}
