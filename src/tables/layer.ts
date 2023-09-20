import { Colors, Handle, LineTypes, TagsManager } from "@/utils";
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

export interface LayerOptions {
  name: string;
  flags?: number;
  colorNumber?: number;
  lineTypeName?: string;
  lineWeight?: number;
  materialObjectHandle?: string;
  trueColor?: number;
}

export class LayerEntry extends Entry {
  readonly name: string;
  flags: number;
  colorNumber: number;
  lineTypeName: string;
  plottingFlag?: number;
  lineWeight?: number;
  plotStyleNameObjectHandle: string;
  materialObjectHandle?: string;
  trueColor?: number;

  static readonly layerZeroName = "0";

  constructor(options: LayerOptions, handle: Handle) {
    super("LAYER", handle);
    this.name = options.name;
    this.flags = options.flags ?? LayerFlags.None;
    this.colorNumber = options.colorNumber ?? Colors.White;
    this.lineTypeName = options.lineTypeName ?? LineTypes.Continuous;
    this.lineWeight = options.lineWeight;
    this.plotStyleNameObjectHandle = "0";
    this.materialObjectHandle = options.materialObjectHandle;
    this.trueColor = options.trueColor;
  }

  override tagify(mg: TagsManager): void {
    super.tagify(mg);
    mg.add(100, "AcDbLayerTableRecord");
    mg.add(2, this.name);
    mg.add(70, this.flags);
    mg.add(62, this.colorNumber);
    mg.add(420, this.trueColor);
    mg.add(6, this.lineTypeName);
    mg.add(370, this.lineWeight);
    mg.add(390, this.plotStyleNameObjectHandle);
    mg.add(347, this.materialObjectHandle);
  }
}

export class Layer extends XTable<LayerEntry> {
  constructor(handle: Handle) {
    super("LAYER", handle);
  }

  get(name: string) {
    return this.find((layer) => layer.name === name);
  }

  add(options: LayerOptions) {
    return this.addEntry(new LayerEntry(options, this.handle));
  }
}
