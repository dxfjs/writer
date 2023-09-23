import {
  AlignedDimension,
  AlignedDimensionOptions,
  AngularLineDimensionOptions,
  AngularLinesDimension,
  AngularPointsDimension,
  AngularPointsDimensionOptions,
  DiameterDimension,
  DiameterDimensionOptions,
  LinearDimension,
  LinearDimensionOptions,
  RadialDimension,
  RadialDimensionOptions,
} from "./dimension";
import { Arc, ArcOptions } from "./arc";
import { Attdef, AttdefOptions } from "./attdef";
import { Attrib, AttribOptions } from "./attrib";
import { BBox, Handle, TagsManager } from "@/utils";
import { BlockRecordEntry, LayerEntry } from "@/tables";
import { Circle, CircleOptions } from "./circle";
import { Ellipse, EllipseOptions } from "./ellipse";
import { Entity, EntityOptions } from "./entity";
import { Face, FaceOptions } from "./face";
import { Hatch, HatchOptions } from "./hatch";
import { Insert, InsertOptions } from "./insert";
import { LWPolyline, LWPolylineOptions } from "./lwpolyline";
import { Leader, LeaderOptions } from "./leader";
import { Line, LineOptions } from "./line";
import { MLeader, MLeaderOptions } from "./mleader";
import { MText, MTextOptions } from "./mtext";
import { Mesh, MeshOptions } from "./mesh";
import { Point, PointOptions } from "./point";
import { Polyline, PolylineOptions } from "./polyline";
import { Ray, RayOptions } from "./ray";
import { Rectangle, RectangleOptions } from "@/shapes";
import { Spline, SplineOptions } from "./spline";
import { Table, TableOptions } from "./table";
import { Text, TextOptions } from "./text";
import { Taggable } from "@/types";

export class EntitiesManager implements Taggable {
  readonly blockRecord: BlockRecordEntry;
  readonly handle: Handle;
  readonly handleSeed: string;
  readonly entities: Entity[];

  currentLayerName: string;

  private _tableSeed = 1;

  constructor(BlockRecordEntry: BlockRecordEntry, handle: Handle) {
    this.blockRecord = BlockRecordEntry;
    this.handle = handle;
    this.handleSeed = handle.next();
    this.entities = [];
    this.currentLayerName = LayerEntry.layerZeroName;
  }

  bbox() {
    return BBox.boxes(this.entities.map((e) => e.bbox()));
  }

  add<TEntity extends Entity, TOptions extends EntityOptions>(
    ctor: new (options: TOptions, handle: Handle) => TEntity,
    options: TOptions
  ) {
    const instance = new ctor(options, this.handle);
    if (instance.changeOwner)
      instance.ownerObjectHandle = this.blockRecord.handleSeed;
    if (instance.layerName == null) instance.layerName = this.currentLayerName;
    if (this.blockRecord.isPaperSpace) instance.inPaperSpace = true;
    this.push(instance);
    return instance;
  }

  push(entity?: Entity) {
    if (entity == null) return;
    this.entities.push(entity);
  }

  addArc(options: ArcOptions) {
    return this.add(Arc, options);
  }

  addAttdef(options: AttdefOptions) {
    return this.add(Attdef, options);
  }

  addAttrib(options: AttribOptions) {
    return this.add(Attrib, options);
  }

  addAlignedDim(options: AlignedDimensionOptions) {
    return this.add(AlignedDimension, options);
  }

  addAngularLinesDim(options: AngularLineDimensionOptions) {
    return this.add(AngularLinesDimension, options);
  }

  addAngularPointsDim(options: AngularPointsDimensionOptions) {
    return this.add(AngularPointsDimension, options);
  }

  addCircle(options: CircleOptions) {
    return this.add(Circle, options);
  }

  addDiameterDim(options: DiameterDimensionOptions) {
    return this.add(DiameterDimension, options);
  }

  addEllipse(options: EllipseOptions) {
    return this.add(Ellipse, options);
  }

  addFace(options: FaceOptions) {
    return this.add(Face, options);
  }

  addHatch(options: HatchOptions) {
    return this.add(Hatch, options);
  }

  addInsert(options: InsertOptions) {
    return this.add(Insert, options);
  }

  addLeader(options: LeaderOptions) {
    return this.add(Leader, options);
  }

  addLine(options: LineOptions) {
    return this.add(Line, options);
  }

  addLinearDim(options: LinearDimensionOptions) {
    return this.add(LinearDimension, options);
  }

  addLWPolyline(options: LWPolylineOptions) {
    return this.add(LWPolyline, options);
  }

  addMesh(options: MeshOptions) {
    return this.add(Mesh, options);
  }

  addMLeader(options: MLeaderOptions) {
    return this.add(MLeader, options);
  }

  addMText(options: MTextOptions) {
    return this.add(MText, options);
  }

  addPoint(options: PointOptions) {
    return this.add(Point, options);
  }

  addPolyline(options: PolylineOptions) {
    return this.add(Polyline, options);
  }

  addRadialDim(options: RadialDimensionOptions) {
    return this.add(RadialDimension, options);
  }

  addRectangle(options: RectangleOptions) {
    const { vertices } = new Rectangle(options);
    return this.addLWPolyline({ vertices, ...options });
  }

  addRay(options: RayOptions) {
    return this.add(Ray, options);
  }

  addSpline(options: SplineOptions) {
    return this.add(Spline, options);
  }

  addTable(options: Omit<TableOptions, "blockName">) {
    const blockName = `*T${this._tableSeed++}`;
    return this.add(Table, { blockName, ...options });
  }

  addText(options: TextOptions) {
    return this.add(Text, options);
  }

  tagify(mg: TagsManager): void {
    this.entities.forEach((e) => e.tagify(mg));
  }
}
