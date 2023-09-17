import { TagsManager, rad } from "@/utils";
import { Taggable } from "@/types";

export const HatchGradientType = {
  Linear: "LINEAR",
  Cylinder: "CYLINDER",
  InvCylinder: "INVCYLINDER",
  Spherical: "SPHERICAL",
  HemiSpherical: "HEMISPHERICAL",
  Curved: "CURVED",
  InvSpherical: "SPHERICAL",
  InvHemiSpherical: "INVHEMISPHERICAL",
  InvCurved: "INVCURVED",
} as const;

export interface HatchGradientOptions {
  first: number;
  second?: number;
  angle?: number;
  definition?: number;
  tint?: number;
  type?: string;
}

export class HatchGradient implements Taggable {
  first: number;
  second: number;
  angle: number;
  definition: number;
  tint: number;
  type: string;

  constructor(options: HatchGradientOptions) {
    this.first = options.first;
    this.second = options.second || 7;
    this.angle = options.angle ?? 0;
    this.definition = options.definition ?? 0;
    this.tint = options.tint ?? 0;
    this.type = options.type || HatchGradientType.Linear;
  }

  tagify(mg: TagsManager): void {
    mg.add(450, 1);
    mg.add(451, 0);
    mg.add(460, rad(this.angle));
    mg.add(461, this.definition);
    mg.add(452, this.second ? 0 : 1);
    mg.add(462, this.tint);
    mg.add(453, 2);
    mg.add(463, 0);
    mg.add(63, this.first);
    mg.add(463, 1);
    mg.add(63, this.second);
    mg.add(470, this.type);
  }
}
