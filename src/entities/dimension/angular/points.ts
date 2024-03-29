import { Dimension, DimensionOptions, DimensionType } from "../dimension";
import { Point3D } from "@/types";
import { TagsManager } from "@/utils";

export interface AngularPointsDimensionOptions extends DimensionOptions {
  center: Point3D;
  first: Point3D;
  second: Point3D;
}

export class AngularPointsDimension extends Dimension {
  center: Point3D;
  first: Point3D;
  second: Point3D;

  constructor(options: AngularPointsDimensionOptions) {
    super(options);
    this.dimensionType = DimensionType.Angular3Point;
    this.center = options.center;
    this.first = options.first;
    this.second = options.second;
  }

  protected override tagifyChild(mg: TagsManager): void {
    super.tagifyChild(mg);
    mg.add(100, "AcDb3PointAngularDimension");
    mg.point(this.first, 3);
    mg.point(this.second, 4);
    mg.point(this.center, 5);
  }
}
