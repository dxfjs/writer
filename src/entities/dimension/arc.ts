import { Dimension, DimensionOptions } from "./dimension";
import { Handle, TagsManager } from "../../utils";
import { Point3D } from "../../types.ts";

export interface ArcDimensionOptions extends DimensionOptions {
  center: Point3D;
  startPoint: Point3D;
  endPoint: Point3D;
  startAngle?: number;
  endAngle?: number;
  isPartial?: boolean;
  hasLeader?: boolean;
  firstLeaderPoint?: Point3D;
  secondLeaderPoint?: Point3D;
}

export class ArcDimension extends Dimension {
  center: Point3D;
  startPoint: Point3D;
  endPoint: Point3D;
  startAngle: number;
  endAngle: number;
  isPartial?: boolean;
  hasLeader?: boolean;
  firstLeaderPoint?: Point3D;
  secondLeaderPoint?: Point3D;

  constructor(options: ArcDimensionOptions, handle: Handle) {
    super(options, handle);
    this._type = "ARC_DIMENSION";
    this.center = options.center;
    this.startPoint = options.startPoint;
    this.endPoint = options.endPoint;
    this.startAngle = options.startAngle ?? 0;
    this.endAngle = options.endAngle ?? 0;
    this.isPartial = options.isPartial;
    this.hasLeader = options.hasLeader;
    this.firstLeaderPoint = options.firstLeaderPoint;
    this.secondLeaderPoint = options.secondLeaderPoint;
  }

  protected override tagifyChild(mg: TagsManager): void {
    super.tagifyChild(mg);
    mg.add(100, "AcDbArcDimension");

    mg.point(this.startPoint, 3);
    mg.point(this.endPoint, 4);
    mg.point(this.center, 5);

    mg.add(40, this.startAngle);
    mg.add(41, this.endAngle);

    mg.add(70, Number(this.isPartial ?? 0));
    mg.add(71, Number(this.hasLeader ?? 0));

    mg.point(this.firstLeaderPoint, 6);
    mg.point(this.secondLeaderPoint, 7);
  }
}
