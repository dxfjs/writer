import { Tag, Taggable } from "../types";
import { TagsManager } from "../utils";

export class Variable implements Taggable {
  readonly tags: Tag[];

  constructor(public readonly name: string) {
    this.tags = [];
  }

  add(code: number, value: string | number) {
    this.tags.push({ code, value });
    return this;
  }

  clear() {
    this.tags.length = 0;
  }

  tagify(mg: TagsManager) {
    if (this.tags.length > 0) {
      mg.add(9, this.name);
      this.tags.forEach((t) => mg.add(t.code, t.value));
    }
  }
}
