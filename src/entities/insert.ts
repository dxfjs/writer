import {
  BoundingBox,
  BBox,
  Handle,
  TagsManager,
  extrusion,
  point,
} from "../utils";
import { EntityOptions, Entity } from "./entity";
import { Point3D } from "../types";

export interface InsertOptions extends EntityOptions {
  attributesFollowFlag?: number;
  blockName: string;
  insertionPoint?: Point3D;
  scale?: Partial<Point3D>;
  rotation?: number;
  columnCount?: number;
  rowCount?: number;
  columnSpacing?: number;
  rowSpacing?: number;
  extrusion?: Point3D;
}

export class Insert extends Entity {
  attributesFollowFlag?: number;
  blockName: string;
  insertionPoint: Point3D;
  scale: Partial<Point3D>;
  rotation: number;
  columnCount: number;
  rowCount: number;
  columnSpacing: number;
  rowSpacing: number;
  extrusion?: Point3D;

  override get subClassMarker(): string {
    return "AcDbBlockReference";
  }

  constructor(options: InsertOptions, handle: Handle) {
    super("INSERT", handle, options);
    this.attributesFollowFlag = options.attributesFollowFlag;
    this.blockName = options.blockName;
    this.insertionPoint = options.insertionPoint || point();
    this.scale = options.scale || point(1, 1, 1);
    this.rotation = options.rotation ?? 0;
    this.columnCount = options.columnCount ?? 1;
    this.rowCount = options.rowCount ?? 1;
    this.columnSpacing = options.columnSpacing ?? 0;
    this.rowSpacing = options.rowSpacing ?? 0;
    this.extrusion = options.extrusion || extrusion();
  }

  override bbox(): BoundingBox {
    return BBox.point(this.insertionPoint);
  }

  protected override tagifyChild(mg: TagsManager): void {
    mg.add(66, this.attributesFollowFlag);
    mg.add(2, this.blockName);
    mg.point(this.insertionPoint);
    mg.add(41, this.scale.x);
    mg.add(42, this.scale.y);
    mg.add(43, this.scale.z);
    mg.add(50, this.rotation);
    mg.add(70, this.columnCount);
    mg.add(71, this.rowCount);
    mg.add(44, this.columnSpacing);
    mg.add(45, this.rowSpacing);
    mg.point(this.extrusion, 200);
  }
}
