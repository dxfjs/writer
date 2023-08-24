import { Point2D, Taggable } from "../../types";
import { XTagsManager, onezero } from "../../utils";

export const SOLID = "SOLID";

export interface HatchPatternDataOptions {
  angle: number;
  base: Point2D;
  offset: Point2D;
  dashLengths: number[];
}

export class HatchPatternData implements Taggable {
  angle: number;
  base: Point2D;
  offset: Point2D;
  dashLengths: number[];

  constructor(options: HatchPatternDataOptions) {
    this.angle = options.angle;
    this.base = options.base;
    this.offset = options.offset;
    this.dashLengths = options.dashLengths;
  }

  tagify(mg: XTagsManager): void {
    mg.add(53, this.angle);
    mg.add(43, this.base.x);
    mg.add(44, this.base.y);
    mg.add(45, this.offset.x);
    mg.add(46, this.offset.y);
    mg.add(79, this.dashLengths.length);
    this.dashLengths.forEach((d) => mg.add(49, d));
  }
}

export interface HatchPatternOptions {
  name: string;
  data?: HatchPatternData[];
  angle?: number;
  scale?: number;
  double?: boolean;
}

export class HatchPattern implements Taggable {
  name: string;
  data: HatchPatternData[];
  angle: number;
  scale: number;
  double: boolean;

  constructor(options: HatchPatternOptions) {
    this.name = options.name;
    this.data = options.data || [];
    this.angle = options.angle ?? 0;
    this.scale = options.scale ?? 1;
    this.double = options.double || false;
  }

  add(options: HatchPatternDataOptions) {
    const d = new HatchPatternData(options);
    this.data.push(d);
    return d;
  }

  tagify(mg: XTagsManager): void {
    if (this.name === SOLID) return;
    mg.add(52, this.angle);
    mg.add(41, this.scale);
    mg.add(77, onezero(this.double));
    mg.add(78, this.data.length);
    this.data.forEach((d) => d.tagify(mg));
  }
}
