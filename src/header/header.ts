import { Handle, TagsManager } from "@/utils";
import { Taggable } from "@/types";
import { Variable } from "./variable";

export class Header implements Taggable {
  readonly handle: Handle;
  readonly variables: Variable[];

  constructor(handle: Handle) {
    this.handle = handle;
    this.variables = [];
    this.add("$ACADVER").add(1, "AC1021");
    this.handseed();
  }

  add(name: string) {
    const f = this.variables.find((v) => v.name === name);
    if (f) return f;

    const v = new Variable(name);
    this.variables.push(v);
    return v;
  }

  exists(name: string) {
    return this.variables.find((v) => v.name === name) != null;
  }

  tagify(mg: TagsManager): void {
    this.handseed();
    mg.sectionStart("HEADER");
    this.variables.forEach((v) => v.tagify(mg));
    mg.sectionEnd();
  }

  private handseed() {
    const handseed = this.add("$HANDSEED");
    handseed.clear();
    handseed.add(5, this.handle.peek());
  }
}
