import { Point3D } from "../types";
import { point } from "./functions";

export interface BoundingBox {
  maxX: number;
  maxY: number;
  maxZ: number;
  minX: number;
  minY: number;
  minZ: number;
}

export function bbox(min?: Point3D, max?: Point3D): BoundingBox {
  return {
    maxX: max?.x ?? -Infinity,
    maxY: max?.y ?? -Infinity,
    maxZ: max?.z ?? -Infinity,
    minX: min?.x ?? Infinity,
    minY: min?.y ?? Infinity,
    minZ: min?.z ?? Infinity,
  };
}

export class BBox {
  static point(p: Point3D, radius?: number) {
    radius = radius ?? 100;
    return bbox(
      point(p.x - radius, p.y - radius, p.z - radius),
      point(p.x + radius, p.y + radius, p.z + radius)
    );
  }

  static line(start: Point3D, end: Point3D) {
    const box = bbox();
    box.maxX = start.x > end.x ? start.x : end.x;
    box.maxY = start.y > end.y ? start.y : end.y;
    box.maxZ = start.z > end.z ? start.z : end.z;
    box.minX = start.x < end.x ? start.x : end.x;
    box.minY = start.y < end.y ? start.y : end.y;
    box.minZ = start.z < end.z ? start.z : end.z;
    return box;
  }

  static points(points: Point3D[]) {
    if (points.length === 0) return BBox.point(point());
    const box = bbox();
    points.forEach((p) => {
      if (box.maxX < p.x) box.maxX = p.x;
      if (box.maxY < p.y) box.maxY = p.y;
      if (box.maxZ < p.z) box.maxZ = p.z;
      if (box.minX > p.x) box.minX = p.x;
      if (box.minY > p.y) box.minY = p.y;
      if (box.minZ > p.z) box.minZ = p.z;
    });
    return box;
  }

  static boxes(boxes: BoundingBox[]) {
    if (boxes.length === 0) return BBox.point(point());
    const points: Point3D[] = [];
    boxes.forEach((box) => {
      points.push(point(box.maxX, box.maxY, box.maxZ));
      points.push(point(box.minX, box.minY, box.minZ));
    });
    return BBox.points(points);
  }

  static center(box: BoundingBox) {
    return point(
      box.minX + (box.maxX - box.minX) / 2,
      box.minY + (box.maxY - box.minY) / 2,
      box.minZ + (box.maxZ - box.minZ) / 2
    );
  }

  static height(box: BoundingBox) {
    return box.maxY - box.minY;
  }
}
