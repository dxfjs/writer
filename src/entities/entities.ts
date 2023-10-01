import { Blocks } from "@/blocks";
import { Taggable } from "@/types";
import { TagsManager } from "@/utils";

export interface EntitiesOptions {
  blocks: Blocks;
}

export class Entities implements Taggable {
  readonly blocks: Blocks;

  get modelSpace() {
    return this.blocks.modelSpace;
  }

  get paperSpace() {
    return this.blocks.paperSpace;
  }

  constructor(options: EntitiesOptions) {
    this.blocks = options.blocks;
  }

  tagify(mg: TagsManager): void {
    mg.sectionStart("ENTITIES");
    this.paperSpace.entities.forEach((e) => e.tagify(mg));
    this.modelSpace.entities.forEach((e) => e.tagify(mg));
    mg.sectionEnd();
  }
}
