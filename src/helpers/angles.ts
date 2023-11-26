import { TOW_PI, periodic } from "@/helpers";
import { Point2D } from "@/types";

export function pdeg(value: number) {
  return periodic(value, 0, 360);
}

export function prad(value: number) {
  return periodic(value, 0, TOW_PI);
}

export function angleBetween(
  target: number,
  a: number,
  b: number,
  radians?: boolean
) {
  const p = radians ? prad : pdeg;

  (target = p(target)), (a = p(a)), (b = p(b));

  if (a < b) return a <= target && target <= b;
  return a <= target || target <= b;
}

export function calculateAngle(start: Point2D, end: Point2D) {
  let angle = Math.atan2(end.y - start.y, end.x - start.x);
  if (angle < 0) angle += TOW_PI;
  return angle;
}
