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
import { BBox, Seeder, TagsManager } from "@/utils";
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
import { OmitBlockName, OmitSeeder, Taggable, WithSeeder } from "@/types";
import { Point, PointOptions } from "./point";
import { Polyline, PolylineOptions } from "./polyline";
import { Ray, RayOptions } from "./ray";
import { Rectangle, RectangleOptions } from "@/shapes";
import { Solid, SolidOptions } from "./solid";
import { Spline, SplineOptions } from "./spline";
import { Table, TableOptions } from "./table";
import { Text, TextOptions } from "./text";
import { Entity } from "./entity";

export interface EntitiesManagerOptions extends WithSeeder {
  blockRecord: BlockRecordEntry;
}

export class EntitiesManager implements Taggable, WithSeeder {
  readonly blockRecord: BlockRecordEntry;
  readonly seeder: Seeder;
  readonly handle: string;
  readonly entities: Entity[];

  currentLayerName: string;

  private _tableSeed = 1;

  constructor({ blockRecord, seeder }: EntitiesManagerOptions) {
    this.blockRecord = blockRecord;
    this.seeder = seeder;
    this.handle = seeder.next();
    this.entities = [];
    this.currentLayerName = LayerEntry.layerZeroName;
  }

  bbox() {
    return BBox.boxes(this.entities.map((e) => e.bbox()));
  }

  add<E extends Entity, O>(
    ctor: new (options: WithSeeder<O>) => E,
    options: O
  ) {
    const { seeder } = this;
    const instance = new ctor({ ...options, seeder });
    if (instance.changeOwner)
      instance.ownerObjectHandle = this.blockRecord.handle;
    if (instance.layerName == null) instance.layerName = this.currentLayerName;
    if (this.blockRecord.isPaperSpace) instance.inPaperSpace = true;
    this.push(instance);
    return instance;
  }

  push(entity?: Entity) {
    if (entity == null) return;
    this.entities.push(entity);
  }

  addArc(options: OmitSeeder<ArcOptions>) {
    return this.add(Arc, options);
  }

  addAttdef(options: OmitSeeder<AttdefOptions>) {
    return this.add(Attdef, options);
  }

  addAttrib(options: OmitSeeder<AttribOptions>) {
    return this.add(Attrib, options);
  }

  addAlignedDim(options: OmitSeeder<AlignedDimensionOptions>) {
    return this.add(AlignedDimension, options);
  }

  addAngularLinesDim(options: OmitSeeder<AngularLineDimensionOptions>) {
    return this.add(AngularLinesDimension, options);
  }

  addAngularPointsDim(options: OmitSeeder<AngularPointsDimensionOptions>) {
    return this.add(AngularPointsDimension, options);
  }

  addCircle(options: OmitSeeder<CircleOptions>) {
    return this.add(Circle, options);
  }

  addDiameterDim(options: OmitSeeder<DiameterDimensionOptions>) {
    return this.add(DiameterDimension, options);
  }

  addEllipse(options: OmitSeeder<EllipseOptions>) {
    return this.add(Ellipse, options);
  }

  addFace(options: OmitSeeder<FaceOptions>) {
    return this.add(Face, options);
  }

  addHatch(options: OmitSeeder<HatchOptions>) {
    return this.add(Hatch, options);
  }

  addInsert(options: OmitSeeder<InsertOptions>) {
    return this.add(Insert, options);
  }

  addLeader(options: OmitSeeder<LeaderOptions>) {
    return this.add(Leader, options);
  }

  addLine(options: OmitSeeder<LineOptions>) {
    return this.add(Line, options);
  }

  addLinearDim(options: OmitSeeder<LinearDimensionOptions>) {
    return this.add(LinearDimension, options);
  }

  addLWPolyline(options: OmitSeeder<LWPolylineOptions>) {
    return this.add(LWPolyline, options);
  }

  addMesh(options: OmitSeeder<MeshOptions>) {
    return this.add(Mesh, options);
  }

  addMLeader(options: OmitSeeder<MLeaderOptions>) {
    return this.add(MLeader, options);
  }

  addMText(options: OmitSeeder<MTextOptions>) {
    return this.add(MText, options);
  }

  addPoint(options: OmitSeeder<PointOptions>) {
    return this.add(Point, options);
  }

  addPolyline(options: OmitSeeder<PolylineOptions>) {
    return this.add(Polyline, options);
  }

  addRadialDim(options: OmitSeeder<RadialDimensionOptions>) {
    return this.add(RadialDimension, options);
  }

  addRectangle(options: OmitSeeder<RectangleOptions>) {
    const { seeder } = this;
    const rect = new Rectangle({ ...options, seeder });
    return this.addLWPolyline(rect.lwpolylineOptions);
  }

  addRay(options: OmitSeeder<RayOptions>) {
    return this.add(Ray, options);
  }

  addSolid(options: OmitSeeder<OmitBlockName<SolidOptions>>) {
    return this.add(Solid, options);
  }

  addSpline(options: OmitSeeder<SplineOptions>) {
    return this.add(Spline, options);
  }

  addTable(options: OmitSeeder<OmitBlockName<TableOptions>>) {
    const blockName = `*T${this._tableSeed++}`;
    return this.add(Table, { blockName, ...options });
  }

  addText(options: OmitSeeder<TextOptions>) {
    return this.add(Text, options);
  }

  tagify(mg: TagsManager): void {
    this.entities.forEach((e) => e.tagify(mg));
  }
}
