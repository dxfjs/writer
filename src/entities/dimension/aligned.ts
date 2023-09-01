import { Dimension, DimensionOptions, DimensionType } from "./dimension";
import { Handle, TagsManager, angle, point, polar } from "../../utils";
import { Point3D } from "../../types";

export interface AlignedDimensionOptions extends DimensionOptions {
  insertion?: Point3D;
  start: Point3D;
  end: Point3D;
  offset?: number;
}

export class AlignedDimension extends Dimension {
  insertion?: Point3D;
  start: Point3D;
  end: Point3D;

  constructor(options: AlignedDimensionOptions, handle: Handle) {
    super(options, handle);
    this.dimensionType = DimensionType.Aligned;
    this.insertion = options.insertion;
    this.start = options.start;
    this.end = options.end;
    this.offset(options.offset);
  }

  protected override tagifyChild(mg: TagsManager): void {
    super.tagifyChild(mg);
    mg.add(100, "AcDbAlignedDimension");
    mg.point(this.insertion, 2);
    mg.point(this.start, 3);
    mg.point(this.end, 4);
  }

  private offset(v?: number) {
    if (v == null) return;
    const middle = point(
      (this.start.x + this.end.x) / 2,
      (this.start.y + this.end.y) / 2
    );
    this.definitionPoint = polar(middle, angle(this.start, this.end) + 90, v);
  }
}
