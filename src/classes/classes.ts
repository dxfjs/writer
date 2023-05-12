import { Taggable } from "types";
import { XTagsManager } from "../utils";

export class XClasses implements Taggable {
  tagify(mg: XTagsManager): void {
    mg.sectionStart("CLASSES");
    mg.sectionEnd();
  }
}
