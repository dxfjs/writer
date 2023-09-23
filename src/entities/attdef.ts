import { Handle, TagsManager } from "@/utils";
import { Text, TextOptions } from "./text";

export interface AttdefOptions extends TextOptions {
  prompt?: string;
  tag: string;
  flags?: number;
}

export class Attdef extends Text {
  prompt: string;
  tag: string;
  flags: number;

  protected override get subClassMarker2(): string {
    return "AcDbAttributeDefinition";
  }

  constructor(options: AttdefOptions, handle: Handle) {
    super(options, handle);
    this._type = "ATTDEF";
    this.prompt = options.prompt || "";
    this.tag = options.tag;
    this.flags = options.flags || 0;
  }

  protected override tagifyChild(mg: TagsManager): void {
    mg.add(39, this.thickness);
    mg.point(this.firstAlignmentPoint);
    mg.add(40, this.height);
    mg.add(1, this.value);
    mg.add(50, this.rotation);
    mg.add(41, this.relativeXScaleFactor);
    mg.add(51, this.obliqueAngle);
    mg.add(7, this.styleName);
    mg.add(71, this.generationFlags);
    mg.add(72, this.horizontalJustification);
    mg.point(this.secondAlignmentPoint, 1);
    mg.add(100, this.subClassMarker2);
    mg.add(280, 0);
    mg.add(3, this.prompt);
    mg.add(2, this.tag);
    mg.add(70, this.flags);
    mg.add(74, this.verticalJustification);
    mg.add(280, 1);
  }
}
