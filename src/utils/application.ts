import { Tag, Taggable } from "../types";
import { TagsManager } from "./tags";

export class AppDefined implements Taggable {
  readonly values: Tag[];

  constructor(public readonly name: string) {
    this.values = [];
  }

  add(code: number, value: string | number) {
    this.values.push({ code, value });
  }

  clear() {
    this.values.length = 0;
  }

  tagify(mg: TagsManager): void {
    if (this.values.length > 0) {
      mg.add(102, `{${this.name}`);
      this.values.forEach((tag) => mg.add(tag.code, tag.value));
      mg.add(102, "}");
    }
  }
}
