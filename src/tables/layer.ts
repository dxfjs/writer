import { Colors, LineTypes, TagsManager, onezero } from "@/utils";
import { OmitSeeder, WithSeeder } from "@/types";
import { Entry } from "./entry";
import { XTable } from "./table";

export const LayerFlags = {
  None: 0,
  Frozen: 1,
  FrozenInNewViewports: 2,
  Locked: 4,
  XRefDependent: 16,
  XRefResolved: 32,
  Referenced: 64,
} as const;

export interface LayerOptions extends WithSeeder {
  name: string;
  flags?: number;
  colorNumber?: number;
  lineTypeName?: string;
  lineWeight?: number;
  materialObjectHandle?: string;
  trueColor?: number;
  plot?: boolean;
}

export class LayerEntry extends Entry {
  readonly name: string;
  flags: number;
  colorNumber: number;
  lineTypeName: string;
  lineWeight?: number;
  plotStyleNameObjectHandle: string;
  materialObjectHandle?: string;
  trueColor?: number;
  plot?: boolean;

  static readonly layerZeroName = "0";

  constructor(options: LayerOptions) {
    super({ seeder: options.seeder, type: "LAYER" });
    this.name = options.name;
    this.flags = options.flags ?? LayerFlags.None;
    this.colorNumber = options.colorNumber ?? Colors.White;
    this.lineTypeName = options.lineTypeName ?? LineTypes.Continuous;
    this.lineWeight = options.lineWeight;
    this.plotStyleNameObjectHandle = "0";
    this.materialObjectHandle = options.materialObjectHandle;
    this.trueColor = options.trueColor;
    this.plot = options.plot;
    if (this.name.toLocaleLowerCase() === "defpoints") this.plot = false;
  }

  override tagify(mg: TagsManager): void {
    super.tagify(mg);
    mg.add(100, "AcDbLayerTableRecord");
    mg.add(2, this.name);
    mg.add(70, this.flags);
    mg.add(62, this.colorNumber);
    mg.add(420, this.trueColor);
    mg.add(6, this.lineTypeName);
    mg.add(290, onezero(this.plot));
    mg.add(370, this.lineWeight);
    mg.add(390, this.plotStyleNameObjectHandle);
    mg.add(347, this.materialObjectHandle);
  }
}

export interface LayerTableOptions extends WithSeeder {}

export class Layer extends XTable<LayerEntry> {
  constructor(options: LayerTableOptions) {
    super({ seeder: options.seeder, name: "LAYER" });
  }

  get(name: string) {
    return this.find((layer) => layer.name === name);
  }

  add(options: OmitSeeder<LayerOptions>) {
    return this.addEntry(LayerEntry, options);
  }
}
