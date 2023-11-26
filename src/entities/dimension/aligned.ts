import { Dimension, DimensionOptions, DimensionType } from "./dimension";
import { TagsManager, angle, point, polar } from "@/utils";
import { Point3D } from "@/types";
import { linep } from "@/helpers";

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

  readonly offset: number;

  constructor(options: AlignedDimensionOptions) {
    super(options);
    this.dimensionType = DimensionType.Aligned;
    this.insertion = options.insertion;
    this.start = options.start;
    this.end = options.end;
    this.offset = options.offset ?? 0;
    this._offset();
  }

  protected override tagifyChild(mg: TagsManager): void {
    super.tagifyChild(mg);
    mg.add(100, "AcDbAlignedDimension");
    mg.point(this.insertion, 2);
    mg.point(this.start, 3);
    mg.point(this.end, 4);
  }

  private _offset() {
    const { offset } = this;
    if (offset == null) return;
    const sign = Math.sign(this.offset);
    const a = angle(this.start, this.end) + 90 * sign;
    const start = polar(this.start, a, this.offset);
    this.definition = polar(this.end, a, this.offset);
    const middle = linep(start, this.definition).middle;
    this.middle = point(middle.x, middle.y);
  }
}
