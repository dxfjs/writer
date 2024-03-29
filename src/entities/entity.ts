import {
  AppDefined,
  BBox,
  BoundingBox,
  Seeder,
  TagsManager,
  XData,
  onezero,
  point,
  stringByteSize,
  stringChunksSplit,
} from "@/utils";
import { Taggable, WithSeeder } from "@/types";

export interface EntityOptions extends WithSeeder {
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

export abstract class Entity implements Taggable, WithSeeder {
  readonly seeder: Seeder;
  readonly handle: string;
  protected _type: string;

  ownerObjectHandle: string;
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

  readonly applications: AppDefined[];

  readonly reactors: AppDefined;
  readonly xdictionary: AppDefined;

  readonly xdatas: XData[];

  get visibility() {
    if (this.visible == null) return;
    return this.visible ? 0 : 1;
  }

  abstract get subClassMarker(): string | undefined;

  get type() {
    return this._type;
  }

  get changeOwner() {
    return true;
  }

  constructor(options: EntityOptions) {
    this.seeder = options.seeder;
    this._type = ""; // To be set by child class
    this.handle = this.seeder.next();

    this.ownerObjectHandle = "0";
    this.inPaperSpace = options?.inPaperSpace;
    this.layoutTabName = options?.layoutTabName;
    this.layerName = options?.layerName;
    this.lineTypeName = options?.lineTypeName;
    this.materialObjectHandle = options?.materialObjectHandle;
    this.colorNumber = options?.colorNumber;
    this.lineWeight = options?.lineWeight;
    this.lineTypeScale = options?.lineTypeScale;
    this.visible = options?.visible;
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
    mg.add(5, this.handle);
    this.applications.forEach((a) => a.tagify(mg));
    mg.add(330, this.ownerObjectHandle);
    mg.add(100, "AcDbEntity");
    mg.add(67, onezero(this.inPaperSpace));
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
