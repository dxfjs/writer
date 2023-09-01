import { AlignedDimensionOptions, AlignedDimension } from "./dimension";
import { ArcOptions, Arc } from "./arc";
import { BlockRecordEntry, LayerEntry } from "../tables";
import { CircleOptions, Circle } from "./circle";
import { EllipseOptions, Ellipse } from "./ellipse";
import { FaceOptions, Face } from "./face";
import { HatchOptions, Hatch } from "./hatch";
import { InsertOptions, Insert } from "./insert";
import { LWPolylineOptions, LWPolyline } from "./lwpolyline";
import { LeaderOptions, Leader } from "./leader";
import { LineOptions, Line } from "./line";
import { MLeaderOptions, MLeader } from "./mleader";
import { MTextOptions, MText } from "./mtext";
import { PointOptions, Point } from "./point";
import { PolylineOptions, Polyline } from "./polyline";
import { RayOptions, Ray } from "./ray";
import { SplineOptions, Spline } from "./spline";
import { TextOptions, Text } from "./text";
import { BBox, Handle, TagsManager } from "../utils";
import { Taggable } from "../types";
import { Entity } from "./entity";
import { MeshOptions, Mesh } from "./mesh";

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

  addAlignedDimension(options: AlignedDimensionOptions) {
    return this.add(new AlignedDimension(options, this.handle));
  }

  addCircle(options: CircleOptions) {
    return this.add(new Circle(options, this.handle));
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
