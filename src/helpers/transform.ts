import { Point2D } from "@/index";

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
  const { cos, sin } = Math;
  const ox = target.x - center.x;
  const oy = target.y - center.y;
  return {
    x: center.x + (ox * cos(angle) - oy * sin(angle)),
    y: center.y + (ox * sin(angle) + oy * cos(angle)),
  };
}

export function translate(options: TranslateOptions) {
  const { target, translation } = options;
  return {
    x: target.x + translation.x,
    y: target.y + translation.y,
  };
}

export function transform(options: TransformOptions) {
  const { target, translation, center, angle } = options;
  return rotate({
    target: translate({ target, translation }),
    center,
    angle,
  });
}
