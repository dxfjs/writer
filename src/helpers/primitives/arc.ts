import {
  HALF_PI,
  LinePrimitive,
  Vector,
  Writable,
  angleBetween,
  calculateAngle,
} from "@/helpers";
import { deg, point } from "@/utils";
import { Block } from "@/blocks";
import { Point2D } from "@/types";

export interface ArcPrimitiveOptions {
  center: Point2D;
  radius: number;
  startAngle: number;
  endAngle: number;
  clockwise?: boolean;
}

export class ArcPrimitive implements Writable {
  center: Point2D;
  radius: number;
  startAngle: number;
  endAngle: number;
  clockwise: boolean;

  get cw() {
    if (this.clockwise) return this.clone();
    else {
      const { center, radius, startAngle, endAngle } = this;
      return new ArcPrimitive({
        center,
        radius,
        startAngle: endAngle,
        endAngle: startAngle,
        clockwise: true,
      });
    }
  }

  get ccw() {
    if (this.clockwise) {
      const { center, radius, startAngle, endAngle } = this;
      return new ArcPrimitive({
        center,
        radius,
        startAngle: endAngle,
        endAngle: startAngle,
        clockwise: false,
      });
    } else return this.clone();
  }

  static from3Points(start: Point2D, middle: Point2D, end: Point2D) {
    const line1 = new LinePrimitive(start, middle);
    const line2 = new LinePrimitive(middle, end);

    const rotated1 = line1.rotate(line1.middle, HALF_PI);
    const rotated2 = line2.rotate(line2.middle, HALF_PI);

    const center = rotated1.intersect(rotated2);

    if (center == null) return null;

    const vstart = new Vector(start.x, start.y);
    const radius = center.distance(vstart);

    const startAngle = deg(calculateAngle(center, start));
    const middleAngle = deg(calculateAngle(center, middle));
    const endAngle = deg(calculateAngle(center, end));

    const clockwise = angleBetween(middleAngle, endAngle, startAngle);

    return new ArcPrimitive({
      center,
      radius,
      startAngle,
      endAngle,
      clockwise,
    });
  }

  constructor(options: ArcPrimitiveOptions) {
    const { x, y } = options.center;
    this.center = { x, y };
    this.radius = options.radius;
    this.startAngle = options.startAngle;
    this.endAngle = options.endAngle;
    this.clockwise = options.clockwise || false;
  }

  clone() {
    const { center, radius, startAngle, endAngle, clockwise } = this;
    return new ArcPrimitive({
      center,
      radius,
      startAngle,
      endAngle,
      clockwise,
    });
  }

  write<B extends Block>(block: B) {
    const center = point(this.center.x, this.center.y);
    const startAngle = this.clockwise ? this.endAngle : this.startAngle;
    const endAngle = this.clockwise ? this.startAngle : this.endAngle;
    const radius = this.radius;
    return block.addArc({ center, radius, startAngle, endAngle });
  }
}
