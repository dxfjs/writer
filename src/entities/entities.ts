import { XBlock, XBlocks } from "../blocks";
import { Taggable } from "../types";
import { XTagsManager } from "../utils";

export class XEntities implements Taggable {
  readonly modelSpace: XBlock;
  readonly paperSpace: XBlock;

  constructor(blocks: XBlocks) {
    this.modelSpace = blocks.modelSpace;
    this.paperSpace = blocks.paperSpace;
  }

  tagify(mg: XTagsManager): void {
    mg.sectionStart("ENTITIES");
    this.modelSpace.entities.forEach((e) => e.tagify(mg));
    mg.sectionEnd();
  }
}
