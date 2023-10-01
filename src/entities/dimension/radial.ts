import { Dimension, DimensionOptions, DimensionType } from "./dimension";
import { Point3D } from "@/types.ts";
import { TagsManager } from "@/utils";

export interface RadialDimensionOptions extends DimensionOptions {
  first: Point3D;
  leaderLength: number;
}

export class RadialDimension extends Dimension {
  first: Point3D;
  leaderLength: number;

  constructor(options: RadialDimensionOptions) {
    super(options);
    this.dimensionType = DimensionType.Radius;
    this.first = options.first;
    this.leaderLength = options.leaderLength;
  }

  protected override tagifyChild(mg: TagsManager) {
    super.tagifyChild(mg);
    mg.add(100, "AcDbRadialDimension");
    mg.point(this.first, 5);
    mg.add(40, this.leaderLength);
  }
}
