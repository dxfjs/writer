import { Taggable } from "../types";
import { XBlocks } from "../blocks";
import { XTagsManager } from "../utils";

export class XEntities implements Taggable {
  readonly blocks: XBlocks;

  get modelSpace() {
    return this.blocks.modelSpace;
  }

  get paperSpace() {
    return this.blocks.paperSpace;
  }

  constructor(blocks: XBlocks) {
    this.blocks = blocks;
  }

  tagify(mg: XTagsManager): void {
    mg.sectionStart("ENTITIES");
    this.paperSpace.entities.forEach((e) => e.tagify(mg));
    this.modelSpace.entities.forEach((e) => e.tagify(mg));
    mg.sectionEnd();
  }
}
