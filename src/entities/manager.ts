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
import { BBox, Handle, TagsManager } from "@/utils";
import { BlockRecordEntry, LayerEntry } from "@/tables";
import { Circle, CircleOptions } from "./circle";
import { Ellipse, EllipseOptions } from "./ellipse";
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
import { Spline, SplineOptions } from "./spline";
import { Text, TextOptions } from "./text";
import { Entity } from "./entity";
import { Taggable } from "@/types";

export class EntitiesManager implements Taggable {
  readonly blockRecord: BlockRecordEntry;
  readonly handle: Handle;
  readonly handleSeed: string;
  readonly entities: Entity[];

  currentLayerName: string;

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

  add<TEntity extends Entity>(entity: TEntity) {
    entity.ownerBlockRecordObjectHandle = this.blockRecord.handleSeed;
    if (entity.layerName == null) entity.layerName = this.currentLayerName;
    if (this.blockRecord.isPaperSpace) entity.inPaperSpace = true;
    this.entities.push(entity);
    return entity;
  }

  addArc(options: ArcOptions) {
    return this.add(new Arc(options, this.handle));
  }

  addAlignedDim(options: AlignedDimensionOptions) {
    return this.add(new AlignedDimension(options, this.handle));
  }

  addAngularLinesDim(options: AngularLineDimensionOptions) {
    return this.add(new AngularLinesDimension(options, this.handle));
  }

  addAngularPointsDim(options: AngularPointsDimensionOptions) {
    return this.add(new AngularPointsDimension(options, this.handle));
  }

  addCircle(options: CircleOptions) {
    return this.add(new Circle(options, this.handle));
  }

  addDiameterDim(options: DiameterDimensionOptions) {
    return this.add(new DiameterDimension(options, this.handle));
  }

  addEllipse(options: EllipseOptions) {
    return this.add(new Ellipse(options, this.handle));
  }

  addFace(options: FaceOptions) {
    return this.add(new Face(options, this.handle));
  }

  addHatch(options: HatchOptions) {
    return this.add(new Hatch(options, this.handle));
  }

  addInsert(options: InsertOptions) {
    return this.add(new Insert(options, this.handle));
  }

  addLeader(options: LeaderOptions) {
    return this.add(new Leader(options, this.handle));
  }

  addLine(options: LineOptions) {
    return this.add(new Line(options, this.handle));
  }

  addLinearDim(options: LinearDimensionOptions) {
    return this.add(new LinearDimension(options, this.handle));
  }

  addLWPolyline(options: LWPolylineOptions) {
    return this.add(new LWPolyline(options, this.handle));
  }

  addMesh(options: MeshOptions) {
    return this.add(new Mesh(options, this.handle));
  }

  addMLeader(options: MLeaderOptions) {
    return this.add(new MLeader(options, this.handle));
  }

  addMText(options: MTextOptions) {
    return this.add(new MText(options, this.handle));
  }

  addPoint(options: PointOptions) {
    return this.add(new Point(options, this.handle));
  }

  addPolyline(options: PolylineOptions) {
    return this.add(new Polyline(options, this.handle));
  }

  addRadialDim(options: RadialDimensionOptions) {
    return this.add(new RadialDimension(options, this.handle));
  }

  addRay(options: RayOptions) {
    return this.add(new Ray(options, this.handle));
  }

  addSpline(options: SplineOptions) {
    return this.add(new Spline(options, this.handle));
  }

  addText(options: TextOptions) {
    return this.add(new Text(options, this.handle));
  }

  tagify(mg: TagsManager): void {
    this.entities.forEach((e) => e.tagify(mg));
  }
}
