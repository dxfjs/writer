import { XHandle, XTagsManager } from "../utils";
import { Taggable } from "../types";
import { XVariable } from "./variable";

export class XHeader implements Taggable {
  readonly handle: XHandle;
  readonly variables: XVariable[];

  constructor(handle: XHandle) {
    this.handle = handle;
    this.variables = [];
    this.add("$ACADVER").add(1, "AC1021");
    this.handseed();
  }

  add(name: string) {
    const f = this.variables.find((v) => v.name === name);
    if (f) return f;

    const v = new XVariable(name);
    this.variables.push(v);
    return v;
  }

  exists(name: string) {
    return this.variables.find((v) => v.name === name) != null;
  }

  tagify(mg: XTagsManager): void {
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
