import {Dimension, DimensionOptions, DimensionType} from "./dimension";
import {Handle, TagsManager} from "../../utils";
import {Point3D} from "../../types.ts";

export interface DiameterDimensionOptions extends DimensionOptions {
  first: Point3D;
  leaderLength: number;
}

export class DiameterDimension extends Dimension {
  first: Point3D;
  leaderLength: number;
  constructor(options: DiameterDimensionOptions, handle: Handle) {
    super(options, handle);
    this.dimensionType = DimensionType.Diameter;
    this.first = options.first;
    this.leaderLength = options.leaderLength;
  }

  protected override tagifyChild(mg: TagsManager) {
    super.tagifyChild(mg);
    mg.add(100, "AcDbDiametricDimension");
    mg.point(this.first, 5);
    mg.add(40, this.leaderLength);
  }
}
