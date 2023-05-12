import { EntityOptions, XEntity } from "../entity";
import { Point3D, Union } from "../../types";
import { XHandle, XTagsManager, extrusion } from "../../utils";

export const DimensionType = {
  None: 0,
  Aligned: 1,
  Angular: 2,
  Diameter: 3,
  Radius: 4,
  Angular3Point: 5,
  Ordinate: 6,
  ReferencedByThis: 32,
  OrdinateType: 64,
  UserDefined: 128,
} as const;

export const DimAttachmentPoint = {
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

export const DimTextLineSpacingStyle = {
  AtLeast: 1,
  Exact: 2,
} as const;

export interface DimensionOptions extends EntityOptions {
  blockName?: string;
  definitionPoint?: Point3D;
  middlePoint?: Point3D;
  attachmentPoint?: Union<typeof DimAttachmentPoint>;
  textLineSpacingStyle?: Union<typeof DimTextLineSpacingStyle>;
  textLineSpacingFactor?: number;
  measurement?: number;
  text?: string;
  textRotation?: number;
  horizontalDirection?: number;
  extrusion?: Point3D;
  dimStyleName?: string;
}

export class XDimension extends XEntity {
  blockName?: string;
  definitionPoint?: Point3D;
  middlePoint?: Point3D;
  dimensionType: Union<typeof DimensionType>;
  attachmentPoint: Union<typeof DimAttachmentPoint>;
  textLineSpacingStyle?: Union<typeof DimTextLineSpacingStyle>;
  textLineSpacingFactor?: number;
  measurement?: number;
  text?: string;
  textRotation?: number;
  horizontalDirection?: number;
  extrusion: Point3D;
  dimStyleName?: string;

  override get subClassMarker(): string | undefined {
    return "AcDbDimension";
  }

  constructor(options: DimensionOptions, handle: XHandle) {
    super("DIMENSION", handle, options);
    this.blockName = options.blockName;
    this.definitionPoint = options.definitionPoint;
    this.middlePoint = options.middlePoint;
    this.dimensionType = DimensionType.None;
    this.attachmentPoint =
      options.attachmentPoint ?? DimAttachmentPoint.MiddleCenter;
    this.textLineSpacingStyle = options.textLineSpacingStyle;
    this.textLineSpacingFactor = options.textLineSpacingFactor;
    this.measurement = options.measurement;
    this.text = options.text;
    this.textRotation = options.textRotation;
    this.horizontalDirection = options.horizontalDirection;
    this.extrusion = options.extrusion ?? extrusion();
    this.dimStyleName = options.dimStyleName;
  }

  protected override tagifyChild(mg: XTagsManager): void {
    mg.add(2, this.blockName);
    mg.point(this.definitionPoint);
    mg.point(this.middlePoint, 1);
    mg.add(70, this.dimensionType);
    mg.add(71, this.attachmentPoint);
    mg.add(72, this.textLineSpacingStyle);
    mg.add(41, this.textLineSpacingFactor);
    mg.add(42, this.measurement);
    mg.add(1, this.text);
    mg.add(53, this.textRotation);
    mg.add(51, this.horizontalDirection);
    mg.point(this.extrusion, 200);
    mg.add(3, this.dimStyleName);
  }
}