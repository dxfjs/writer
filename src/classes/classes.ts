import { Taggable } from "@/types";
import { TagsManager } from "@/utils";

export class Classes implements Taggable {
  tagify(mg: TagsManager): void {
    mg.sectionStart("CLASSES");
    mg.sectionEnd();
  }
}
