import {
  AppDefined,
  BBox,
  BoundingBox,
  Handle,
  TagsManager,
  XData,
  point,
  stringByteSize,
  stringChunksSplit,
} from "@/utils";
import { Taggable } from "@/types";

export interface EntityOptions {
  inPaperSpace?: boolean;
  layoutTabName?: string;
  layerName?: string;
  lineTypeName?: string;
  materialObjectHandle?: string;
  colorNumber?: number;
  lineWeight?: number;
  lineTypeScale?: number;
  visible?: boolean;
  proxyEntityGraphics?: string;
  trueColor?: number;
  colorNumberClassLevel?: number;
  transparencyClassLevel?: number;
  plotStyleObjectHandle?: string;
  shadowMode?: number;
}

export abstract class Entity implements Taggable {
  readonly handle: Handle;
  readonly handleSeed: string;
  protected _type: string;

  ownerBlockRecordObjectHandle: string;
  inPaperSpace: boolean;
  layoutTabName?: string;
  layerName?: string;
  lineTypeName?: string;
  materialObjectHandle?: string;
  colorNumber?: number;
  lineWeight: number;
  lineTypeScale?: number;
  visible: boolean;
  proxyEntityGraphics?: string;
  trueColor?: number;
  colorNumberClassLevel?: number;
  transparencyClassLevel?: number;
  plotStyleObjectHandle?: string;
  shadowMode?: number;

  readonly applications: AppDefined[];

  readonly reactors: AppDefined;
  readonly xdictionary: AppDefined;

  readonly xdatas: XData[];

  get visibility() {
    return this.visible ? 0 : 1;
  }

  abstract get subClassMarker(): string | undefined;

  get type() {
    return this._type;
  }

  constructor(type: string, handle: Handle, options?: EntityOptions) {
    this.handle = handle;
    this.handleSeed = handle.next();
    this._type = type;

    this.ownerBlockRecordObjectHandle = "0";
    this.inPaperSpace = options?.inPaperSpace || false;
    this.layoutTabName = options?.layoutTabName;
    this.layerName = options?.layerName;
    this.lineTypeName = options?.lineTypeName;
    this.materialObjectHandle = options?.materialObjectHandle;
    this.colorNumber = options?.colorNumber;
    this.lineWeight = options?.lineWeight ?? -3;
    this.lineTypeScale = options?.lineTypeScale;
    this.visible = options?.visible || true;
    this.proxyEntityGraphics = options?.proxyEntityGraphics;
    this.trueColor = options?.trueColor;
    this.colorNumberClassLevel = options?.colorNumberClassLevel;
    this.transparencyClassLevel = options?.transparencyClassLevel;
    this.plotStyleObjectHandle = options?.plotStyleObjectHandle;
    this.shadowMode = options?.shadowMode;

    this.applications = [];
    this.reactors = this.addAppDefined("ACAD_REACTORS");
    this.xdictionary = this.addAppDefined("ACAD_XDICTIONARY");

    this.xdatas = [];
  }

  addAppDefined(name: string) {
    const f = this.applications.find((a) => a.name === name);
    if (f) return f;

    const a = new AppDefined(name);
    this.applications.push(a);
    return a;
  }

  addXData(name: string): XData {
    const f = this.xdatas.find((x) => x.name === name);
    if (f) return f;

    const x = new XData(name);
    this.xdatas.push(x);
    return x;
  }

  bbox(): BoundingBox {
    return BBox.point(point());
  }

  protected abstract tagifyChild(mg: TagsManager): void;

  tagify(mg: TagsManager): void {
    mg.add(0, this.type);
    mg.add(5, this.handleSeed);
    this.applications.forEach((a) => a.tagify(mg));
    mg.add(330, this.ownerBlockRecordObjectHandle);
    mg.add(100, "AcDbEntity");
    mg.add(67, Number(this.inPaperSpace));
    mg.add(410, this.layoutTabName);
    mg.add(8, this.layerName || "0");
    mg.add(6, this.lineTypeName);
    mg.add(347, this.materialObjectHandle);
    mg.add(62, this.colorNumber);
    mg.add(370, this.lineWeight);
    mg.add(48, this.lineTypeScale);
    mg.add(60, this.visibility);
    if (this.proxyEntityGraphics) {
      mg.add(92, stringByteSize(this.proxyEntityGraphics));
      stringChunksSplit(this.proxyEntityGraphics).forEach((c) => {
        mg.add(310, c);
      });
    }
    mg.add(420, this.trueColor);
    mg.add(430, this.colorNumberClassLevel);
    mg.add(440, this.transparencyClassLevel);
    mg.add(390, this.plotStyleObjectHandle);
    mg.add(284, this.shadowMode);
    mg.add(100, this.subClassMarker);
    this.tagifyChild(mg);
    this.xdatas.forEach((x) => x.tagify(mg));
  }
}
