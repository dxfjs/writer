import { BBox, BoundingBox, TagsManager, extrusion } from "@/utils";
import { Entity, EntityOptions } from "./entity";
import { Point3D } from "@/types";

export interface SolidOptions extends EntityOptions {
  first: Point3D;
  second: Point3D;
  third: Point3D;
  fourth?: Point3D;
  thickness?: number;
  extrusion?: Point3D;
}

export class Solid extends Entity {
  first: Point3D;
  second: Point3D;
  third: Point3D;
  fourth: Point3D;
  thickness?: number;
  extrusion: Point3D;

  override get subClassMarker() {
    return "AcDbTrace";
  }

  constructor(options: SolidOptions) {
    super(options);
    this._type = "SOLID";
    this.first = options.first;
    this.second = options.second;
    this.third = options.third;
    this.fourth = options.fourth || this.third;
    this.thickness = options.thickness;
    this.extrusion = options.extrusion || extrusion();
  }

  override bbox(): BoundingBox {
    const { first, second, third, fourth } = this;
    return BBox.points([first, second, third, fourth]);
  }

  protected override tagifyChild(mg: TagsManager) {
    mg.point(this.first);
    mg.point(this.second, 1);
    mg.point(this.third, 2);
    mg.point(this.fourth, 3);
    mg.add(39, this.thickness);
  }
}
