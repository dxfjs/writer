import {
  BBox,
  BoundingBox,
  Handle,
  TagsManager,
  openUniformKnots,
} from "@/utils";
import { Entity, EntityOptions } from "./entity";
import { Point3D, Union } from "@/types";

export const SplineFlags = {
  None: 0,
  Closed: 1,
  Periodic: 2,
  Rational: 4,
  Planar: 8,
  Linear: 16,
} as const;

export interface SplineOptions extends EntityOptions {
  normal?: Point3D;
  flags?: Union<typeof SplineFlags>;
  degree?: number;
  startTangent?: Point3D;
  endTangent?: Point3D;
  knots?: number[];
  controls: Point3D[];
  weights?: number[];
  fits?: Point3D[];
}

export class Spline extends Entity {
  normal?: Point3D;
  flags: Union<typeof SplineFlags>;
  degree: number;
  startTangent?: Point3D;
  endTangent?: Point3D;
  knots: number[];
  controls: Point3D[];
  weights: number[];
  fits: Point3D[];

  override get subClassMarker(): string {
    return "AcDbSpline";
  }

  get clen() {
    return this.controls.length;
  }

  get flen() {
    return this.fits.length;
  }

  get klen() {
    return this.knots.length;
  }

  constructor(options: SplineOptions, handle: Handle) {
    super("SPLINE", handle, options);
    this.normal = options.normal;
    this.flags = options.flags ?? SplineFlags.None;
    this.degree = options.degree ?? 3;
    this.startTangent = options.startTangent;
    this.endTangent = options.endTangent;
    this.knots = options.knots || [];
    this.controls = options.controls;
    this.weights = options.weights = [];
    this.fits = options.fits || [];

    if (this.klen === 0) this.knots = openUniformKnots(this.clen, this.degree);
  }

  override bbox(): BoundingBox {
    return BBox.boxes([BBox.points(this.controls), BBox.points(this.fits)]);
  }

  protected override tagifyChild(mg: TagsManager): void {
    mg.point(this.normal, 200);
    mg.add(70, this.flags);
    mg.add(71, this.degree);
    mg.add(72, this.klen);
    mg.add(73, this.clen);
    mg.add(74, this.flen);
    mg.add(42, 0.0000001);
    mg.add(43, 0.0000001);
    mg.add(44, 0.0000000001);
    mg.point(this.startTangent, 2);
    mg.point(this.endTangent, 3);
    this.knots.forEach((k) => mg.add(40, k));
    this.weights.forEach((w) => mg.add(41, w));
    this.controls.forEach((c) => mg.point(c));
    this.fits.forEach((f) => mg.point(f, 1));
  }
}
