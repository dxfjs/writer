import { Point2D, Point3D, Tag } from "../types";

export function point(x?: number, y?: number, z?: number): Point3D {
  return {
    x: x ?? 0,
    y: y ?? 0,
    z: z ?? 0,
  };
}

export function point2d(x?: number, y?: number): Point2D {
  return {
    x: x ?? 0,
    y: y ?? 0,
  };
}

export function tag(code: number, value: string | number): Tag {
  return { code, value };
}

export function stringByteSize(value: string) {
  return new Blob([value]).size;
}

export function stringChunksSplit(value: string, length = 255) {
  const chunks: string[] = [];
  const tempChunk: string[] = [];
  for (let i = 0; i < value.length; i++) {
    const char = value[i];
    tempChunk.push(char);
    if (tempChunk.length === length || i === value.length - 1) {
      chunks.push(tempChunk.join(""));
      tempChunk.length = 0;
    }
  }
  return chunks;
}

export function extrusion() {
  return point(0, 0, 1);
}

function nknots(n: number, degree: number) {
  return n + degree + 1;
}

export function uniformKnots(n: number, degree: number) {
  const knots: number[] = [];
  for (let i = 0; i < nknots(n, degree); i++) knots.push(i);
  return knots;
}

export function openUniformKnots(n: number, degree: number) {
  const knots: number[] = [];
  let k = 0;
  for (let i = 0; i < nknots(n, degree); i++) {
    if (i <= degree || i >= n + 1) knots.push(k);
    else knots.push(++k);
  }
  return knots;
}

export function deg(rad: number) {
  return (rad * 180) / Math.PI;
}

export function rad(deg: number) {
  return (deg * Math.PI) / 180;
}

export function angle(start: Point2D, end: Point2D) {
  let dir = Math.atan2(end.y - start.y, end.x - start.x);
  if (dir < 0) dir += 2 * Math.PI;
  return deg(dir);
}

export function polar(origin: Point2D, angle: number, distance: number) {
  return point(
    origin.x + distance * Math.cos(rad(angle)),
    origin.y + distance * Math.sin(rad(angle))
  );
}
