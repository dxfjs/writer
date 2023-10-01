import { OmitSeeder, WithSeeder } from "@/types";
import { TagsManager, Units, XData } from "@/utils";
import { Entry } from "./entry";
import { XTable } from "./table";

export interface BlockRecordOptions extends WithSeeder {
  name: string;
  layoutObjectHandle?: string;
  insertionUnits?: number;
  explodability?: number;
  scalability?: number;
  bitmapPreview?: string;
}

export class BlockRecordEntry extends Entry {
  name: string;
  layoutObjectHandle?: string;
  insertionUnits: number;
  explodability: number;
  scalability: number;
  bitmapPreview?: string;
  acadXData: XData;

  get isPaperSpace() {
    return this.name.startsWith("*Paper_Space");
  }

  constructor(options: BlockRecordOptions) {
    super({ seeder: options.seeder, type: "BLOCK_RECORD" });
    this.name = options.name;
    this.layoutObjectHandle = options.layoutObjectHandle;
    this.insertionUnits = options.insertionUnits ?? Units.Unitless;
    this.explodability = options.explodability ?? 1;
    this.scalability = options.scalability ?? 0;
    this.acadXData = new XData("ACAD");
  }

  override tagify(mg: TagsManager): void {
    super.tagify(mg);
    mg.add(100, "AcDbBlockTableRecord");
    mg.add(2, this.name);
    mg.add(340, this.layoutObjectHandle);
    mg.add(70, this.insertionUnits);
    mg.add(280, this.explodability);
    mg.add(281, this.scalability);
    mg.add(310, this.bitmapPreview);
    this.acadXData.tagify(mg);
  }
}

export interface BlockRecordTableOptions extends WithSeeder {}

export class BlockRecord extends XTable<BlockRecordEntry> {
  constructor(options: BlockRecordTableOptions) {
    super({ seeder: options.seeder, name: "BLOCK_RECORD" });
  }

  add(options: OmitSeeder<BlockRecordOptions>) {
    return this.addEntry(BlockRecordEntry, options);
  }
}
