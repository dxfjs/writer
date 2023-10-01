import { BBox, BoundingBox, TagsManager, onezero } from "@/utils";
import { Entity, EntityOptions } from "./entity";
import { Point3D, Union } from "@/types";

export const PathType = {
  Segments: 0,
  Spline: 1,
} as const;

export const CreationFlag = {
  Text: 0,
  Tolerance: 1,
  BlockRef: 2,
  Without: 3,
} as const;

export const HooklineDirectionFlag = {
  Opposite: 0,
  Same: 1,
} as const;

export interface LeaderOptions extends EntityOptions {
  dimStyleName?: string;
  arrowhead?: boolean;
  pathType?: Union<typeof PathType>;
  creation?: Union<typeof CreationFlag>;
  hooklineDirection?: Union<typeof HooklineDirectionFlag>;
  hookline?: boolean;
  height?: number;
  width?: number;
  vertices: Point3D[];
  color?: number;
  annotationHandle?: string;
  normal?: Point3D;
  horizontalDirection?: Point3D;
  blockOffset?: Point3D;
  annotationOffset?: Point3D;
}

export class Leader extends Entity {
  dimStyleName?: string;
  arrowhead?: boolean;
  pathType?: Union<typeof PathType>;
  creation?: Union<typeof CreationFlag>;
  hooklineDirection?: Union<typeof HooklineDirectionFlag>;
  hookline?: boolean;
  height?: number;
  width?: number;
  vertices: Point3D[];
  color?: number;
  annotationHandle?: string;
  normal?: Point3D;
  horizontalDirection?: Point3D;
  blockOffset?: Point3D;
  annotationOffset?: Point3D;

  override get subClassMarker(): string | undefined {
    return "AcDbLeader";
  }

  constructor(options: LeaderOptions) {
    super(options);
    this._type = "LEADER";
    this.dimStyleName = options.dimStyleName;
    this.arrowhead = options.arrowhead;
    this.pathType = options.pathType;
    this.creation = options.creation;
    this.hooklineDirection = options.hooklineDirection;
    this.hookline = options.hookline;
    this.height = options.height;
    this.width = options.width;
    this.vertices = options.vertices;
    this.color = options.color;
    this.annotationHandle = options.annotationHandle;
    this.normal = options.normal;
    this.horizontalDirection = options.horizontalDirection;
    this.blockOffset = options.blockOffset;
    this.annotationOffset = options.annotationOffset;
  }

  override bbox(): BoundingBox {
    return BBox.points(this.vertices);
  }

  protected override tagifyChild(mg: TagsManager): void {
    mg.add(3, this.dimStyleName);
    mg.add(71, onezero(this.arrowhead));
    mg.add(72, this.pathType);
    mg.add(73, this.creation);
    mg.add(74, this.hooklineDirection);
    mg.add(75, onezero(this.hookline));
    mg.add(40, this.height);
    mg.add(41, this.width);
    mg.add(76, this.vertices.length);
    this.vertices.forEach((v) => mg.point(v));
    mg.add(77, this.color);
    mg.add(340, this.annotationHandle);
    mg.point(this.normal, 200);
    mg.point(this.horizontalDirection, 201);
    mg.point(this.blockOffset, 202);
    mg.point(this.annotationOffset, 203);
  }
}
