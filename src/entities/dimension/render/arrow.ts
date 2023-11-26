import { Point2D, Point3D, WithSeeder } from "@/types";
import { Seeder, point, point2d } from "@/utils";
import { Solid } from "@/entities";
import { transform } from "@/helpers";

export interface DimensionArrowOptions extends WithSeeder {
  size?: number;
  rotation?: number;
  position?: Point3D;
}

export function arrow(options: DimensionArrowOptions) {
  return new DimensionArrow(options).entity();
}

export class DimensionArrow {
  readonly seeder: Seeder;
  size: number;
  rotation: number;
  position: Point3D;

  constructor(options: DimensionArrowOptions) {
    this.seeder = options.seeder;
    this.size = options.size ?? 2.5;
    this.rotation = options.rotation ?? 0;
    this.position = options.position ?? point();
  }

  entity() {
    const { size: s, seeder } = this;
    const h = this.size / 3 / 2;
    return new Solid({
      seeder,
      first: this.position,
      second: this._transform(point2d(-s, -h)),
      third: this._transform(point2d(-s, h)),
    });
  }

  private _transform(target: Point2D) {
    const result = transform({
      target,
      center: this.position,
      angle: this.rotation,
      translation: this.position,
    });
    return point(result.x, result.y);
  }
}
