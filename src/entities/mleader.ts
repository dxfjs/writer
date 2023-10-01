import { Entity, EntityOptions } from "./entity";
import { TagsManager, onezero, point } from "@/utils";
import { Point3D } from "@/types";

export interface MLeaderOptions extends EntityOptions {
  contentScale?: number;
  basePosition?: Point3D;
  textHeight?: number;
  arrowheadSize?: number;
  landingGap?: number;
  textAngleType?: number;
  textAlignmentType?: number;
  value: string;
  textNormal?: Point3D;
  textStyleHandle?: string;
  textPosition: Point3D;
  lastPosition: Point3D;
  doglegVector?: Point3D;
  doglegLength?: number;
  vertices: Point3D[];
}

export class MLeader extends Entity {
  contentScale: number;
  basePosition?: Point3D;
  textHeight: number;
  arrowheadSize: number;
  landingGap: number;
  textAngleType: number;
  textAlignmentType: number;
  hasSetLast: boolean;
  value: string;
  textNormal: Point3D;
  textStyleHandle?: string;
  textPosition: Point3D;
  readonly hasBlock: boolean;
  lastPosition: Point3D;
  doglegVector: Point3D;
  doglegLength: number;
  vertices: Point3D[];

  override get subClassMarker(): string | undefined {
    return "AcDbMLeader";
  }

  constructor(options: MLeaderOptions) {
    super(options);
    this._type = "MULTILEADER";
    this.contentScale = options.contentScale ?? 1;
    this.basePosition = options.basePosition;
    this.textHeight = options.textHeight ?? 0.18;
    this.arrowheadSize = options.arrowheadSize ?? 0.18;
    this.landingGap = options.landingGap ?? 0.09;
    this.textAngleType = options.textAngleType ?? 1;
    this.textAlignmentType = options.textAlignmentType ?? 6;
    this.hasSetLast = true;
    this.value = options.value;
    this.textNormal = options.textNormal || point(0, 0, 1);
    this.textPosition = options.textPosition;
    this.hasBlock = false;
    this.lastPosition = options.lastPosition;
    this.doglegVector = options.doglegVector || point(1);
    this.doglegLength = options.doglegLength ?? 0.36;
    this.vertices = options.vertices;
    if (this.basePosition == null) {
      const { x, y } = this.lastPosition;
      const sign = this.textPosition.x > x ? 1 : -1;
      this.basePosition = point(x + sign * this.doglegLength, y);
    }
  }

  protected override tagifyChild(mg: TagsManager): void {
    mg.add(300, "CONTEXT_DATA{");
    mg.add(40, this.contentScale);
    mg.point(this.basePosition);
    mg.add(41, this.textHeight);
    mg.add(140, this.arrowheadSize);
    mg.add(145, this.landingGap);
    mg.add(174, this.textAngleType);
    mg.add(175, this.textAlignmentType);
    mg.add(290, onezero(this.hasSetLast));
    mg.add(304, this.value);
    mg.point(this.textNormal, 1);
    mg.add(340, this.textStyleHandle);
    mg.point(this.textPosition, 2);
    mg.add(296, onezero(this.hasBlock));
    mg.add(302, "LEADER{");
    mg.add(290, 1);
    mg.add(291, 1);
    mg.point(this.lastPosition);
    mg.point(this.doglegVector, 1);
    mg.add(40, this.doglegLength);
    this.vertices.forEach((v) => {
      mg.add(304, "LEADER_LINE{");
      mg.point(v);
      mg.add(305, "}");
    });
    mg.add(303, "}");
    mg.add(301, "}");
    mg.add(170, 1);
    mg.add(172, 2);
  }
}
