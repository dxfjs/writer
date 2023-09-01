import { BBox, Handle, TagsManager, Units, point2d } from "./utils";
import { BlockOptions, Blocks } from "./blocks";
import { Classes } from "./classes";
import { Entities } from "./entities";
import { Header } from "./header";
import { Objects } from "./objects";
import { Stringifiable } from "./types";
import { Tables } from "./tables";

export class Document implements Stringifiable {
  readonly handle: Handle;
  readonly header: Header;
  readonly classes: Classes;
  readonly blocks: Blocks;
  readonly entities: Entities;
  readonly tables: Tables;
  readonly objects: Objects;

  units: number;

  get modelSpace() {
    return this.blocks.modelSpace;
  }

  get paperSpace() {
    return this.blocks.paperSpace;
  }

  constructor() {
    this.handle = new Handle();
    this.header = new Header(this.handle);
    this.classes = new Classes();
    this.tables = new Tables(this.handle);
    this.blocks = new Blocks(this.tables, this.handle);
    this.entities = new Entities(this.blocks);
    this.objects = new Objects(this.handle);

    this.units = Units.Unitless;
  }

  setUnits(units: number) {
    this.units = units;
  }

  addBlock(options: BlockOptions) {
    this.tables.addBlockRecord(options);
    return this.blocks.addBlock(options);
  }

  addPaperSpace() {
    return this.blocks.addPaperSpace();
  }

  addVariable(name: string) {
    return this.header.add(name);
  }

  stringify(): string {
    const mg = new TagsManager();
    this.fitIn();
    this.header.tagify(mg);
    this.classes.tagify(mg);
    this.tables.tagify(mg);
    this.blocks.tagify(mg);
    this.entities.tagify(mg);
    this.objects.tagify(mg);
    mg.add(0, "EOF");
    return mg.stringify();
  }

  private fitIn() {
    const bbox = this.modelSpace.bbox();
    const center = BBox.center(bbox);
    const height = BBox.height(bbox);
    this.tables.vportActive.lowerLeft = point2d(bbox.minX, bbox.minY);
    this.tables.vportActive.upperRight = point2d(bbox.maxX, bbox.maxY);
    this.tables.vportActive.center = center;
    this.tables.vportActive.height = height;
  }
}
