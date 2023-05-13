import { BoundingBox, XBBox, XHandle, XTagsManager, extrusion } from "../utils";
import { EntityOptions, XEntity } from "./entity";
import { Point3D, Union } from "../types";

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

export const BackgroundFillSetting = {
  Off: 0,
  Fill: 1,
  Window: 2,
} as const;

export interface MTextOptions extends EntityOptions {
  insertionPoint: Point3D;
  height: number;
  referenceRectangleWidth?: number;
  referenceRectangleHeight?: number;
  attachmentPoint?: Union<typeof AttachmentPoint>;
  drawingDirection?: Union<typeof DrawingDirection>;
  value?: string;
  styleName?: string;
  extrusion?: Point3D;
  directionVector?: Point3D;
  horizontalWidth?: number;
  verticalHeight?: number;
  rotation?: number;
  lineSpacingStyle?: number;
  lineSpacingFactor?: number;
  backgroundFillSetting?: number;
  backgroundTrueColor?: number;
  backgroundColorName?: string;
  fillBoxColor?: number;
  backgroundFillColor?: number;
  backgroundTransparency?: number;
  columnsType?: number;
  columnCount?: number;
  columnFlowReversed?: boolean;
  columnAutoHeight?: boolean;
  columnWidth?: number;
  columnGutter?: number;
  columnHeights?: number[];
}

export interface MTextValueOptions {
  value: string;
  fontFamily?: string;
  bold?: boolean;
  italic?: boolean;
  center?: boolean;
  paragraph?: boolean;
  colorNumber?: number;
  underline?: boolean;
}

export class XMText extends XEntity {
  insertionPoint: Point3D;
  height: number;
  referenceRectangleWidth?: number;
  attachmentPoint?: Union<typeof AttachmentPoint>;
  drawingDirection?: Union<typeof DrawingDirection>;
  value: string;
  styleName?: string;
  extrusion: Point3D;
  directionVector?: Point3D;
  horizontalWidth?: number;
  verticalHeight?: number;
  rotation?: number;
  lineSpacingStyle?: number;
  lineSpacingFactor?: number;
  backgroundFillSetting?: number;
  backgroundTrueColor?: number;
  backgroundColorName?: string;
  fillBoxColor?: number;
  backgroundFillColor?: number;
  backgroundTransparency?: number;
  columnsType?: number;
  columnCount?: number;
  columnFlowReversed?: number;
  columnAutoHeight?: number;
  columnWidth?: number;
  columnGutter?: number;
  columnHeights?: number[];
  referenceRectangleHeight?: number;

  override get subClassMarker(): string {
    return "AcDbMText";
  }

  constructor(options: MTextOptions, handle: XHandle) {
    super("MTEXT", handle, options);
    this.insertionPoint = options.insertionPoint;
    this.height = options.height;
    this.referenceRectangleWidth = options.referenceRectangleWidth;
    this.referenceRectangleHeight = options.referenceRectangleHeight;
    this.attachmentPoint = options.attachmentPoint;
    this.drawingDirection = options.drawingDirection;
    this.value = options.value || "";
    this.styleName = options.styleName;
    this.extrusion = options.extrusion = extrusion();
    this.directionVector = options.directionVector;
    this.horizontalWidth = options.horizontalWidth;
    this.verticalHeight = options.verticalHeight;
    this.rotation = options.rotation;
    this.lineSpacingStyle = options.lineSpacingStyle;
    this.lineSpacingFactor = options.lineSpacingFactor;
    this.backgroundFillSetting = options.backgroundFillSetting;
    this.backgroundTrueColor = options.backgroundTrueColor;
    this.backgroundColorName = options.backgroundColorName;
    this.fillBoxColor = options.fillBoxColor;
    this.backgroundFillColor = options.backgroundFillColor;
    this.backgroundTransparency = options.backgroundTransparency;
  }

  add(options: MTextValueOptions) {
    let font = "";
    let style = "";

    if (options.fontFamily) font += `\\f${options.fontFamily}`;
    if (options.bold) font += "|b1";
    if (options.italic) font += "|i1";
    if (options.center) font += "|c1";
    if (font !== "") font += ";";

    if (options.underline) style += "\\L";
    if (options.colorNumber) style += `\\C${options.colorNumber}`;
    if (style !== "") style += ";";

    this.value += `{${font}${style}${options.value}}`;
    if (options.paragraph) this.value += "\\P";
  }

  override bbox(): BoundingBox {
    return XBBox.point(this.insertionPoint);
  }

  protected override tagifyChild(mg: XTagsManager): void {
    mg.point(this.insertionPoint);
    mg.add(40, this.height);
    mg.add(41, this.referenceRectangleWidth);
    mg.add(46, this.referenceRectangleHeight);
    mg.add(71, this.attachmentPoint);
    mg.add(72, this.drawingDirection);
    mg.add(1, this.value);
    mg.add(7, this.styleName);
    mg.point(this.extrusion, 200);
    mg.point(this.directionVector, 1);
    mg.add(42, this.horizontalWidth);
    mg.add(43, this.verticalHeight);
    mg.add(50, this.rotation);
    mg.add(73, this.lineSpacingStyle);
    mg.add(44, this.lineSpacingFactor);
    mg.add(90, this.backgroundFillSetting);
    mg.add(420, this.backgroundTrueColor);
    mg.add(430, this.backgroundColorName);
    mg.add(45, this.fillBoxColor);
    mg.add(63, this.backgroundFillColor);
    mg.add(441, this.backgroundTransparency);
    mg.add(75, this.columnsType);
    mg.add(76, this.columnCount);
    mg.add(78, this.columnFlowReversed);
    mg.add(79, this.columnAutoHeight);
    mg.add(48, this.columnWidth);
    mg.add(49, this.columnGutter);
    this.columnHeights?.forEach((h) => mg.add(50, h));
  }
}
