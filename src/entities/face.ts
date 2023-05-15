import { BoundingBox, XBBox, XHandle, XTagsManager } from "../utils";
import { EntityOptions, XEntity } from "./entity";
import { Point3D, Union } from "../types";

export const InvisibleEdge = {
  None: 0,
  First: 1,
  Second: 2,
  Third: 4,
  Fourth: 8,
} as const;

export interface FaceOptions extends EntityOptions {
  first: Point3D;
  second: Point3D;
  third: Point3D;
  fourth?: Point3D;
  flags?: Union<typeof InvisibleEdge>;
}

export class XFace extends XEntity {
  first: Point3D;
  second: Point3D;
  third: Point3D;
  fourth: Point3D;
  flags: Union<typeof InvisibleEdge>;

  override get subClassMarker() {
    return "AcDbFace";
  }

  constructor(options: FaceOptions, handle: XHandle) {
    super("3DFACE", handle, options);
    this.first = options.first;
    this.second = options.second;
    this.third = options.third;
    this.fourth = options.fourth || this.third;
    this.flags = options.flags ?? InvisibleEdge.None;
  }

  override bbox(): BoundingBox {
    return XBBox.points([this.first, this.second, this.third, this.fourth]);
  }

  protected override tagifyChild(mg: XTagsManager): void {
    mg.point(this.first);
    mg.point(this.second, 1);
    mg.point(this.third, 2);
    mg.point(this.fourth, 3);
    mg.add(70, this.flags);
  }
}
