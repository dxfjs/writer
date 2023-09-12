import { Dimension, DimensionOptions, DimensionType } from "../dimension";
import { Handle, TagsManager } from "../../../utils";
import { Point3D } from "../../../types";

export interface AngularLineDimension {
  start: Point3D;
  end: Point3D;
}

export interface AngularLineDimensionOptions extends DimensionOptions {
  firstLine: AngularLineDimension;
  secondLine: AngularLineDimension;
  positionArc: Point3D;
}

export function dline(start: Point3D, end: Point3D): AngularLineDimension {
  return { start, end };
}

export class AngularLinesDimension extends Dimension {
  firstLine: AngularLineDimension;
  secondLine: AngularLineDimension;
  positionArc: Point3D;

  constructor(options: AngularLineDimensionOptions, handle: Handle) {
    super(options, handle);
    this.dimensionType = DimensionType.Angular;
    this.firstLine = options.firstLine;
    this.secondLine = options.secondLine;
    this.positionArc = options.positionArc;
    this.definition = this.secondLine.end;
  }

  protected override tagifyChild(mg: TagsManager): void {
    super.tagifyChild(mg);
    mg.add(100, "AcDb2LineAngularDimension");
    mg.point(this.firstLine.start, 3);
    mg.point(this.firstLine.end, 4);
    mg.point(this.secondLine.start, 5);
    mg.point(this.positionArc, 6);
  }
}
