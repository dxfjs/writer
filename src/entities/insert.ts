import {
  BBox,
  BoundingBox,
  Handle,
  TagsManager,
  onezero,
  point,
} from "@/utils";
import { Entity, EntityOptions } from "./entity";
import { Point3D } from "@/types";
import { SeqEnd } from "./seqend";

export interface InsertOptions extends EntityOptions {
  followAttributes?: boolean;
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
  followAttributes?: boolean;
  blockName: string;
  insertionPoint: Point3D;
  scale?: Partial<Point3D>;
  rotation?: number;
  columnCount?: number;
  rowCount?: number;
  columnSpacing?: number;
  rowSpacing?: number;
  extrusion?: Point3D;

  readonly seqend?: SeqEnd;

  override get subClassMarker(): string {
    return "AcDbBlockReference";
  }

  constructor(options: InsertOptions, handle: Handle) {
    super("INSERT", handle, options);
    this.followAttributes = options.followAttributes;
    this.blockName = options.blockName;
    this.insertionPoint = options.insertionPoint || point();
    this.scale = options.scale;
    this.rotation = options.rotation;
    this.columnCount = options.columnCount;
    this.rowCount = options.rowCount;
    this.columnSpacing = options.columnSpacing;
    this.rowSpacing = options.rowSpacing;
    this.extrusion = options.extrusion;
    if (this.followAttributes) {
      this.seqend = new SeqEnd(handle);
      this.seqend.ownerObjectHandle = this.handleSeed;
    }
  }

  override bbox(): BoundingBox {
    return BBox.point(this.insertionPoint);
  }

  protected override tagifyChild(mg: TagsManager): void {
    mg.add(66, onezero(this.followAttributes));
    mg.add(2, this.blockName);
    mg.point(this.insertionPoint);
    mg.add(41, this.scale?.x);
    mg.add(42, this.scale?.y);
    mg.add(43, this.scale?.z);
    mg.add(50, this.rotation);
    mg.add(70, this.columnCount);
    mg.add(71, this.rowCount);
    mg.add(44, this.columnSpacing);
    mg.add(45, this.rowSpacing);
    mg.point(this.extrusion, 200);
  }
}
