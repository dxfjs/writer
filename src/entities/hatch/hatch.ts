import { EntityOptions, XEntity } from "../entity";
import { XHandle, XTagsManager, extrusion, point } from "../../utils";
import { Point3D } from "../../types";

export interface HatchOptions extends EntityOptions {
  elevation?: number;
  extrusion?: Point3D;
  patternName: string;
}

export class XHatch extends XEntity {
  elevation: number;
  extrusion: Point3D;
  patternName: string;

  override get subClassMarker(): string | undefined {
    return "AcDbHatch";
  }

  constructor(options: HatchOptions, handle: XHandle) {
    super("HATCH", handle, options);
    this.elevation = options.elevation ?? 0;
    this.extrusion = options.extrusion ?? extrusion();
    this.patternName = options.patternName;
  }

  protected override tagifyChild(mg: XTagsManager): void {
    mg.point(point(0, 0, this.elevation));
    mg.point(this.extrusion, 200);
    mg.add(2, this.patternName);
  }
}
