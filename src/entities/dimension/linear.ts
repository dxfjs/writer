import { Dimension, DimensionOptions } from "./dimension";
import { Handle, TagsManager, polar } from "@/utils";
import { Point3D } from "@/types";

export interface LinearDimensionOptions extends DimensionOptions {
  start: Point3D;
  end: Point3D;
  offset?: number;
  insertion?: Point3D;
  angle?: number;
  types?: number;
}

export class LinearDimension extends Dimension {
  insertion?: Point3D;
  start: Point3D;
  end: Point3D;
  angle: number;
  types?: number;

  constructor(options: LinearDimensionOptions, handle: Handle) {
    super(options, handle);
    this.insertion = options.insertion;
    this.start = options.start;
    this.end = options.end;
    this.angle = options.angle ?? 0;
    this.types = options.types;
    this.offset(options.offset);
  }

  protected override tagifyChild(mg: TagsManager): void {
    super.tagifyChild(mg);
    mg.add(100, "AcDbAlignedDimension");
    mg.point(this.insertion, 2);
    mg.point(this.start, 3);
    mg.point(this.end, 4);
    mg.add(50, this.angle);
    mg.add(52, this.types);
    mg.add(100, "AcDbRotatedDimension");
  }

  private offset(v?: number) {
    if (v == null) return;
    this.definition = polar(this.start, this.angle - 90, v);
  }
}
