import { Point2D } from "@/types";

export class Vector implements Point2D {
  x: number;
  y: number;

  static from(p1: Point2D, p2: Point2D) {
    return new Vector(p2.x - p1.x, p2.y - p1.y);
  }

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(rhs: Vector) {
    return new Vector(this.x + rhs.x, this.y + rhs.y);
  }

  distance(rhs: Vector) {
    return Math.hypot(rhs.x - this.x, rhs.y - this.y);
  }

  cross(rhs: Vector) {
    return this.x * rhs.y - this.y * rhs.x;
  }

  scale(scalar: number) {
    return new Vector(this.x * scalar, this.y * scalar);
  }
}
