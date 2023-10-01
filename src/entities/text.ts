import { Entity, EntityOptions } from "./entity";
import { Point3D, Union } from "@/types";
import { TagsManager, extrusion } from "@/utils";
import { TextGenerationFlags } from "@/tables";

export const TextHorizontalJustification = {
  Left: 0,
  Center: 1,
  Right: 2,
  Aligned: 3,
  Middle: 4,
  Fit: 5,
} as const;

export const TextVerticalJustification = {
  BaseLine: 0,
  Bottom: 1,
  Middle: 2,
  Top: 3,
} as const;

export interface TextOptions extends EntityOptions {
  thickness?: number;
  firstAlignmentPoint: Point3D;
  height: number;
  value: string;
  rotation?: number;
  relativeXScaleFactor?: number;
  obliqueAngle?: number;
  styleName?: string;
  generationFlags?: Union<typeof TextGenerationFlags>;
  horizontalJustification?: Union<typeof TextHorizontalJustification>;
  secondAlignmentPoint?: Point3D;
  extrusion?: Point3D;
  verticalJustification?: Union<typeof TextVerticalJustification>;
}

export class Text extends Entity {
  thickness?: number;
  firstAlignmentPoint: Point3D;
  height: number;
  value: string;
  rotation?: number;
  relativeXScaleFactor?: number;
  obliqueAngle?: number;
  styleName?: string;
  generationFlags?: Union<typeof TextGenerationFlags>;
  horizontalJustification?: Union<typeof TextHorizontalJustification>;
  secondAlignmentPoint?: Point3D;
  extrusion: Point3D;
  verticalJustification?: Union<typeof TextVerticalJustification>;

  override get subClassMarker(): string {
    return "AcDbText";
  }

  protected get subClassMarker2(): string {
    return this.subClassMarker;
  }

  constructor(options: TextOptions) {
    super(options);
    this._type = "TEXT";
    this.thickness = options.thickness;
    this.firstAlignmentPoint = options.firstAlignmentPoint;
    this.height = options.height;
    this.value = options.value;
    this.rotation = options.rotation;
    this.relativeXScaleFactor = options.relativeXScaleFactor;
    this.obliqueAngle = options.obliqueAngle;
    this.styleName = options.styleName;
    this.generationFlags = options.generationFlags;
    this.horizontalJustification = options.horizontalJustification;
    this.secondAlignmentPoint = options.secondAlignmentPoint;
    this.extrusion = options.extrusion || extrusion();
    this.verticalJustification = options.verticalJustification;
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
    mg.point(this.extrusion, 200);
    mg.add(100, this.subClassMarker2);
    mg.add(73, this.verticalJustification);
  }
}
