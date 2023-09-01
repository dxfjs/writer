import {
  BBox,
  BoundingBox,
  Handle,
  TagsManager,
  extrusion,
  onezero,
  point,
} from "../../utils";
import { Entity, EntityOptions } from "../entity";
import { HatchPattern, SOLID } from "./pattern";
import { HatchBoundaryPath } from "./boundary";
import { HatchGradient } from "./gradient";
import { Point3D } from "../../types";

export const AssociativityFlag = {
  NonAssociative: 0,
  Associative: 1,
} as const;

export const HatchStyle = {
  OddParity: 0,
  Outermost: 1,
  Through: 2,
} as const;

export const PatternType = {
  UserDefined: 0,
  Predefined: 1,
  Custom: 2,
} as const;

export interface HatchOptions extends EntityOptions {
  elevation?: number;
  extrusion?: Point3D;
  fill: HatchPattern | HatchGradient;
}

export class Hatch extends Entity {
  elevation: number;
  extrusion: Point3D;
  associativity: number;
  boundaries: HatchBoundaryPath[];
  style: number;
  patternType: number;
  fill: HatchPattern | HatchGradient;

  get isSolid() {
    return this.patternName === SOLID;
  }

  get patternName() {
    if ("name" in this.fill) return this.fill.name;
    return SOLID;
  }

  override get subClassMarker(): string | undefined {
    return "AcDbHatch";
  }

  constructor(options: HatchOptions, handle: Handle) {
    super("HATCH", handle, options);
    this.elevation = options.elevation ?? 0;
    this.extrusion = options.extrusion ?? extrusion();
    this.associativity = AssociativityFlag.NonAssociative;
    this.boundaries = [];
    this.style = HatchStyle.Outermost;
    this.patternType = PatternType.Predefined;
    this.fill = options.fill;
  }

  add() {
    const b = new HatchBoundaryPath();
    this.boundaries.push(b);
    return b;
  }

  override bbox(): BoundingBox {
    return BBox.boxes(this.boundaries.map((b) => b.bbox()));
  }

  protected override tagifyChild(mg: TagsManager): void {
    mg.point(point(0, 0, this.elevation));
    mg.point(this.extrusion, 200);
    mg.add(2, this.patternName);
    mg.add(70, onezero(this.isSolid));
    mg.add(71, this.associativity);
    mg.add(91, this.boundaries.length);
    this.boundaries.forEach((b) => b.tagify(mg));
    mg.add(75, this.style);
    mg.add(76, this.patternType);
    if (!this.isSolid) this.fill.tagify(mg);
    mg.add(47, 1);
    mg.add(98, 0);
    if (this.isSolid) this.fill.tagify(mg);
  }
}
