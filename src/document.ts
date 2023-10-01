import { BBox, Seeder, TagsManager, Units, point2d } from "./utils";
import { BlockOptions, Blocks } from "./blocks";
import { OmitBlockRecord, OmitSeeder, Stringifiable, WithSeeder } from "./types";
import { Classes } from "./classes";
import { Entities } from "./entities";
import { Header } from "./header";
import { Objects } from "./objects";
import { Tables } from "./tables";

export class Document implements Stringifiable, WithSeeder {
  readonly seeder: Seeder;
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
    this.seeder = new Seeder();
    this.header = new Header(this);
    this.classes = new Classes();
    this.tables = new Tables(this);
    this.blocks = new Blocks(this);
    this.entities = new Entities(this);
    this.objects = new Objects(this);

    this.units = Units.Unitless;
  }

  setUnits(units: number) {
    this.units = units;
  }

  setCurrentLayerName(name: string) {
    this.modelSpace.currentLayerName = name;
  }

  addBlock(options: OmitBlockRecord<OmitSeeder<BlockOptions>>) {
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
