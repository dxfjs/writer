import { BlockOptions, XBlocks } from "blocks";
import { Units, XHandle, XTagsManager } from "./utils";
import { Stringifiable } from "./types";
import { XClasses } from "classes";
import { XEntities } from "entities";
import { XHeader } from "header";
import { XObjects } from "objects";
import { XTables } from "tables";

export class XDocument implements Stringifiable {
  readonly handle: XHandle;
  readonly header: XHeader;
  readonly classes: XClasses;
  readonly blocks: XBlocks;
  readonly entities: XEntities;
  readonly tables: XTables;
  readonly objects: XObjects;

  units: number;

  get modelSpace() {
    return this.blocks.modelSpace;
  }

  get paperSpace() {
    return this.blocks.paperSpace;
  }

  constructor() {
    this.handle = new XHandle();
    this.header = new XHeader(this.handle);
    this.classes = new XClasses();
    this.tables = new XTables(this.handle);
    this.blocks = new XBlocks(this.handle);
    this.entities = new XEntities(this.blocks);
    this.objects = new XObjects(this.handle);

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
    const p = this.tables.addPaperSpace();
    return this.blocks.addBlock({
      name: p.name,
    });
  }

  addVariable(name: string) {
    return this.header.add(name);
  }

  stringify(): string {
    const mg = new XTagsManager();
    this.header.tagify(mg);
    this.classes.tagify(mg);
    this.tables.tagify(mg);
    this.blocks.tagify(mg);
    this.entities.tagify(mg);
    this.objects.tagify(mg);
    mg.add(0, "EOF");
    return mg.stringify();
  }
}