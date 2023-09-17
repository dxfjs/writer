import { Handle, TagsManager } from "@/utils";
import { Entry } from "./entry";
import { Point2D } from "@/types";
import { Table } from "./table";

export interface VPortOptions {
  name: string;
  lowerLeft?: Point2D;
  upperRight?: Point2D;
  center?: Point2D;
  height?: number;
}

export class VPortEntry extends Entry {
  readonly name: string;
  lowerLeft?: Point2D;
  upperRight?: Point2D;
  center?: Point2D;
  height?: number;

  constructor(options: VPortOptions, handle: Handle) {
    super("VPORT", handle);
    this.name = options.name;
    this.lowerLeft = options.lowerLeft;
    this.upperRight = options.upperRight;
    this.center = options.center;
    this.height = options.height;
  }

  override tagify(mg: TagsManager): void {
    super.tagify(mg);
    mg.add(100, "AcDbViewportTableRecord");
    mg.add(2, this.name);
    mg.add(70, 0);
    mg.point2d(this.lowerLeft);
    mg.point2d(this.upperRight, 1);
    mg.point2d(this.center, 2);
    mg.add(40, this.height);
    mg.add(41, this.aspect());
  }

  private aspect() {
    if (!this.lowerLeft || !this.upperRight) return 1;
    return (
      (this.upperRight.x - this.lowerLeft.x) /
      (this.upperRight.y - this.lowerLeft.y)
    );
  }
}

export class VPort extends Table {
  constructor(handle: Handle) {
    super("VPORT", handle);
  }

  add(options: VPortOptions) {
    return this.addEntry(new VPortEntry(options, this.handle));
  }
}
