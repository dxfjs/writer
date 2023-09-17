import { Point2D } from "@/types";

export interface RotateOptions {
  target: Point2D;
  center: Point2D;
  angle: number; // in radians
}

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
