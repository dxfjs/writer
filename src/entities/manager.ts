import { AlignedDimensionOptions, XAlignedDimension } from "./dimension";
import { ArcOptions, XArc } from "./arc";
import { BlockRecordEntry, LayerEntry } from "../tables";
import { CircleOptions, XCircle } from "./circle";
import { EllipseOptions, XEllipse } from "./ellipse";
import { FaceOptions, XFace } from "./face";
import { InsertOptions, XInsert } from "./insert";
import { LWPolylineOptions, XLWPolyline } from "./lwpolyline";
import { LineOptions, XLine } from "./line";
import { MTextOptions, XMText } from "./mtext";
import { PointOptions, XPoint } from "./point";
import { PolylineOptions, XPolyline } from "./polyline";
import { RayOptions, XRay } from "./ray";
import { SplineOptions, XSpline } from "./spline";
import { TextOptions, XText } from "./text";
import { XBBox, XHandle, XTagsManager } from "../utils";
import { Taggable } from "../types";
import { XEntity } from "./entity";

export class EntitiesManager implements Taggable {
  readonly blockRecord: BlockRecordEntry;
  readonly handle: XHandle;
  readonly handleSeed: string;
  readonly entities: XEntity[];

  currentLayerName: string;

  constructor(BlockRecordEntry: BlockRecordEntry, handle: XHandle) {
    this.blockRecord = BlockRecordEntry;
    this.handle = handle;
    this.handleSeed = handle.next();
    this.entities = [];
    this.currentLayerName = LayerEntry.layerZeroName;
  }

  bbox() {
    return XBBox.boxes(this.entities.map((e) => e.bbox()));
  }

  add<TEntity extends XEntity>(entity: TEntity) {
    entity.ownerBlockRecordObjectHandle = this.blockRecord.handleSeed;
    if (entity.layerName == null) entity.layerName = this.currentLayerName;
    if (this.blockRecord.isPaperSpace) entity.inPaperSpace = true;
    this.entities.push(entity);
    return entity;
  }

  addArc(options: ArcOptions) {
    return this.add(new XArc(options, this.handle));
  }

  addAlignedDimension(options: AlignedDimensionOptions) {
    return this.add(new XAlignedDimension(options, this.handle));
  }

  addCircle(options: CircleOptions) {
    return this.add(new XCircle(options, this.handle));
  }

  addEllipse(options: EllipseOptions) {
    return this.add(new XEllipse(options, this.handle));
  }

  addFace(options: FaceOptions) {
    return this.add(new XFace(options, this.handle));
  }

  addInsert(options: InsertOptions) {
    return this.add(new XInsert(options, this.handle));
  }

  addLine(options: LineOptions) {
    return this.add(new XLine(options, this.handle));
  }

  addLWPolyline(options: LWPolylineOptions) {
    return this.add(new XLWPolyline(options, this.handle));
  }

  addMText(options: MTextOptions) {
    return this.add(new XMText(options, this.handle));
  }

  addPoint(options: PointOptions) {
    return this.add(new XPoint(options, this.handle));
  }

  addPolyline(options: PolylineOptions) {
    return this.add(new XPolyline(options, this.handle));
  }

  addRay(options: RayOptions) {
    return this.add(new XRay(options, this.handle));
  }

  addSpline(options: SplineOptions) {
    return this.add(new XSpline(options, this.handle));
  }

  addText(options: TextOptions) {
    return this.add(new XText(options, this.handle));
  }

  tagify(mg: XTagsManager): void {
    this.entities.forEach((e) => e.tagify(mg));
  }
}
