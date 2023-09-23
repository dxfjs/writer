import { Entity, EntityOptions } from "./entity";
import { Handle, TagsManager, extrusion } from "@/utils";
import { Point3D, Union } from "@/types";
import { TextHorizontalJustification, TextVerticalJustification } from "./text";
import { Insert } from "./insert";
import { TextGenerationFlags } from "@/tables";

export interface AttribOptions extends EntityOptions {
  thickness?: number;
  startPoint: Point3D;
  height: number;
  value: string;
  tag: string;
  flags?: number;
  rotation?: number;
  relativeXScaleFactor?: number;
  obliqueAngle?: number;
  styleName?: string;
  generationFlags?: Union<typeof TextGenerationFlags>;
  horizontalJustification?: Union<typeof TextHorizontalJustification>;
  verticalJustification?: Union<typeof TextVerticalJustification>;
  alignmentPoint?: Point3D;
  extrusion?: Point3D;
  insert: Insert;
}

export class Attrib extends Entity {
  thickness?: number;
  startPoint: Point3D;
  height: number;
  value: string;
  tag: string;
  flags: number;
  rotation?: number;
  relativeXScaleFactor?: number;
  obliqueAngle?: number;
  styleName?: string;
  generationFlags?: Union<typeof TextGenerationFlags>;
  horizontalJustification?: Union<typeof TextHorizontalJustification>;
  verticalJustification?: Union<typeof TextVerticalJustification>;
  alignmentPoint?: Point3D;
  extrusion: Point3D;
  insert: Insert;

  override get subClassMarker(): string | undefined {
    return "AcDbText";
  }

  override get changeOwner(): boolean {
    return false;
  }

  constructor(options: AttribOptions, handle: Handle) {
    super("ATTRIB", handle, options);
    this.thickness = options.thickness;
    this.startPoint = options.startPoint;
    this.height = options.height;
    this.value = options.value;
    this.tag = options.tag;
    this.flags = options.flags ?? 0;
    this.rotation = options.rotation;
    this.relativeXScaleFactor = options.relativeXScaleFactor;
    this.obliqueAngle = options.obliqueAngle;
    this.styleName = options.styleName;
    this.generationFlags = options.generationFlags;
    this.horizontalJustification = options.horizontalJustification;
    this.verticalJustification = options.verticalJustification;
    this.alignmentPoint = options.alignmentPoint;
    this.extrusion = options.extrusion || extrusion();
    this.insert = options.insert;
    this.ownerObjectHandle = options.insert.handleSeed;
  }

  protected override tagifyChild(mg: TagsManager): void {
    mg.add(39, this.thickness);
    mg.point(this.startPoint);
    mg.add(40, this.height);
    mg.add(1, this.value);
    mg.add(50, this.rotation);
    mg.add(41, this.relativeXScaleFactor);
    mg.add(51, this.obliqueAngle);
    mg.add(7, this.styleName);
    mg.add(100, "AcDbAttribute");
    mg.add(280, 0);
    mg.add(2, this.tag);
    mg.add(70, this.flags);
    mg.add(71, this.generationFlags);
    mg.add(72, this.horizontalJustification);
    mg.add(74, this.verticalJustification);
    mg.point(this.alignmentPoint, 1);
    mg.add(280, 1);
  }
}
