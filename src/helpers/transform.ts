import { Point2D } from "@/types";
import { point2d } from "@/utils";

export interface RotateOptions {
  target: Point2D;
  center: Point2D;
  angle: number; // in radians
}

export interface TranslateOptions {
  target: Point2D;
  translation: Point2D;
}

export type TransformOptions = TranslateOptions & RotateOptions;

export function rotate(options: RotateOptions): Point2D {
  const { target, center, angle } = options;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const ox = target.x - center.x;
  const oy = target.y - center.y;
  return point2d(
    center.x + (ox * cos - oy * sin),
    center.y + (ox * sin + oy * cos)
  );
}

export function translate(options: TranslateOptions) {
  const { target, translation } = options;
  return point2d(target.x + translation.x, target.y + translation.y);
}

export function transform(options: TransformOptions) {
  const { target, translation, center, angle } = options;
  return rotate({
    target: translate({ target, translation }),
    center,
    angle,
  });
}
