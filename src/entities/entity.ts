import {
  BoundingBox,
  XAppDefined,
  XBBox,
  XData,
  XHandle,
  XTagsManager,
  point,
  stringByteSize,
  stringChunksSplit,
} from "../utils";
import { Taggable } from "../types";

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
  trueColor?: string;
  colorNumberClassLevel?: number;
  transparencyClassLevel?: number;
  plotStyleObjectHandle?: string;
  shadowMode?: number;
}

export abstract class XEntity implements Taggable {
  readonly handle: XHandle;
  readonly handleSeed: string;
  readonly type: string;

  ownerBlockRecordObjectHandle: string;
  inPaperSpace: boolean;
  layoutTabName?: string;
  layerName: string;
  lineTypeName: string;
  materialObjectHandle: string;
  colorNumber: number;
  lineWeight: number;
  lineTypeScale?: number;
  visible: boolean;
  proxyEntityGraphics?: string;
  trueColor?: string;
  colorNumberClassLevel?: number;
  transparencyClassLevel?: number;
  plotStyleObjectHandle?: string;
  shadowMode?: number;

  readonly applications: XAppDefined[];

  readonly reactors: XAppDefined;
  readonly xdictionary: XAppDefined;

  readonly xdatas: XData[];

  get visibility() {
    return this.visible ? 0 : 1;
  }

  get subClassMarker(): string | undefined {
    return undefined;
  }

  constructor(
    type: string,
    handle: XHandle,
    options?: EntityOptions
  ) {
    this.handle = handle;
    this.handleSeed = handle.next();
    this.type = type;

    this.ownerBlockRecordObjectHandle = "0";
    this.inPaperSpace = options?.inPaperSpace || false;
    this.layoutTabName = options?.layoutTabName;
    this.layerName = options?.layerName || "ByLayer";
    this.lineTypeName = options?.lineTypeName || "ByLayer";
    this.materialObjectHandle = options?.materialObjectHandle || "ByLayer";
    this.colorNumber = options?.colorNumber ?? 256;
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

    const a = new XAppDefined(name);
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
    return XBBox.point(point());
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected tagifyChild(_mg: XTagsManager): void {}

  tagify(mg: XTagsManager): void {
    mg.add(0, this.type);
    mg.add(5, this.handleSeed);
    this.applications.forEach((a) => a.tagify(mg));
    mg.add(330, this.ownerBlockRecordObjectHandle);
    mg.add(100, "AcDbEntity");
    mg.add(67, Number(this.inPaperSpace));
    mg.add(410, this.layoutTabName);
    mg.add(8, this.layerName);
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
