import { BoundingBox, XBBox, XHandle, XTagsManager, point } from "../utils";
import { EntityOptions, XEntity } from "./entity";
import { Point3D } from "../types";

export const AttachmentPoint = {
  TopLeft: 1,
  TopCenter: 2,
  TopRight: 3,
  MiddleLeft: 4,
  MiddleCenter: 5,
  MiddleRight: 6,
  BottomLeft: 7,
  BottomCenter: 8,
  BottomRight: 9,
} as const;

export const DrawingDirection = {
  LeftToRight: 1,
  TopToBottom: 3,
  ByStyle: 5,
} as const;

export type MTextOptions = EntityOptions

export class XMText extends XEntity {
  insertionPoint: Point3D;
  initialTextHeight: number;
  referenceRectangleWidth: number;
  attachmentPoint: number;
  drawingDirection: number;
  text: string;
  textStyleName: string;
  extrusion: Point3D;
  directionVector: Point3D;
  horizontalWidth: number;
  verticalHeight: number;
  rotation: number;
  lineSpacingStyle: number;
  lineSpacingFactor: number;

  override get subClassMarker(): string {
    return "AcDbMText";
  }

  constructor(options: {}, handle: XHandle) {
    super("MTEXT", handle, options);
  }

  override bbox(): BoundingBox {
    return XBBox.point(point());
  }

  protected override tagifyChild(mg: XTagsManager): void {}
}
