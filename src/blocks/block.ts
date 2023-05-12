import { Point3D, Taggable } from "types";
import {
  XAppDefined,
  XHandle,
  XTagsManager,
  point,
} from "../utils";
import { EntitiesManager } from "../entities";
import { XEndBlk } from "./endblk";

export const BlockFlags = {
  None: 0,
  Anonymous: 1,
  NoAttribute: 2,
  External: 4,
  XRef: 8,
  ExternallyDependent: 16,
  ResolvedXRef: 32,
  ReferencedXRef: 64,
} as const;

export interface BlockOptions {
  name: string;
  layerName?: string;
  flags?: number;
  basePoint?: Point3D;
  secondName?: string;
  xrefPathName?: string;
  description?: string;
}

export class XBlock extends EntitiesManager implements Taggable {
  readonly applications: XAppDefined[];

  ownerObjectHandle: string;
  layerName: string;
  name: string;
  flags: number;
  basePoint: Point3D;
  secondName: string;
  xrefPathName: string;
  description?: string;

  readonly endblk: XEndBlk;

  get isModelOrPaperSpace() {
    return (
      this.name.startsWith("*Model_Space") ||
      this.name.startsWith("*Paper_Space")
    );
  }

  constructor(options: BlockOptions, handle: XHandle) {
    super(handle);
    this.applications = [];

    this.ownerObjectHandle = "0";
    this.layerName = options.layerName || "0";
    this.name = options.name;
    this.flags = options.flags ?? BlockFlags.None;
    this.basePoint = options.basePoint || point();
    this.secondName = options.secondName || this.name;
    this.xrefPathName = options.xrefPathName || "";
    this.description = options.description;

    this.endblk = new XEndBlk(handle);
    this.endblk.ownerObjectHandle = this.ownerObjectHandle;
  }

  addAppDefined(name: string) {
    const f = this.applications.find((a) => a.name === name);
    if (f) return f;

    const a = new XAppDefined(name);
    this.applications.push(a);
    return a;
  }

  override tagify(mg: XTagsManager): void {
    mg.add(0, "BLOCK");
    mg.add(5, this.handleSeed);
    this.applications.forEach((a) => a.tagify(mg));
    mg.add(330, this.ownerObjectHandle);
    mg.add(100, "AcDbEntity");
    mg.add(8, this.layerName);
    mg.add(100, "AcDbBlockBegin");
    mg.add(2, this.name);
    mg.add(70, this.flags);
    mg.point(this.basePoint);
    mg.add(3, this.secondName);
    mg.add(1, this.xrefPathName);
    mg.add(4, this.description);
    if (!this.isModelOrPaperSpace) super.tagify(mg);
    this.endblk.tagify(mg);
  }
}
