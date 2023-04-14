import Entity, { CommonEntityOptions } from '../../Entity'
import { Dxfier } from 'Internals/Dxfier'
import { vec3_t } from 'Internals/Helpers'

export enum DimensionType {
	Default = 0,
	Aligned = 1,
	Angular = 2,
	Diameter = 3,
	Radius = 4,
	Angular3Point = 5,
	Ordinate = 6,
	ReferencedByThis = 32,
	OrdinateType = 64,
}

export enum AttachmentPoint {
	TopLeft = 1,
	TopCenter = 2,
	TopRight = 3,
	MiddleLeft = 4,
	MiddleCenter = 5,
	MiddleRight = 6,
	BottomLeft = 7,
	BottomCenter = 8,
	BottomRight = 9,
}

export enum TextLineSpacingStyle {
	AtLeast = 1,
	Exact = 2,
}

export interface DimensionOptions extends CommonEntityOptions {
	blockName?: string;
	definitionPoint?: vec3_t;
	middlePoint?: vec3_t;
	attachmentPoint?: AttachmentPoint;
	textLineSpacingStyle?: TextLineSpacingStyle;
	textLineSpacingFactor?: number;
	ActualMeasurement?: number;
	text?: string;
	rotation?: 'auto' | number;
	horizontalDirection?: number;
	styleName?: string;
}

export abstract class Dimension extends Entity {
  blockName?: string
  definitionPoint?: vec3_t
  middlePoint?: vec3_t
  protected dimensionType: DimensionType
  attachmentPoint: AttachmentPoint
  textLineSpacingStyle?: TextLineSpacingStyle
  textLineSpacingFactor?: number
  ActualMeasurement?: number
  text?: string
  rotation?: 'auto' | number
  horizontalDirection?: number
  styleName?: string
  constructor(options?: DimensionOptions) {
    super('DIMENSION', 'AcDbDimension', options)
    this.blockName = options?.blockName
    this.definitionPoint = options?.definitionPoint
    this.middlePoint = options?.middlePoint
    this.dimensionType = DimensionType.Default
    this.attachmentPoint = options?.attachmentPoint || AttachmentPoint.MiddleCenter
    this.textLineSpacingStyle = options?.textLineSpacingStyle
    this.textLineSpacingFactor = options?.textLineSpacingFactor
    this.ActualMeasurement = options?.ActualMeasurement
    this.text = options?.text
    this.rotation = options?.rotation
    this.horizontalDirection = options?.horizontalDirection
    this.styleName = options?.styleName
  }

  protected abstract rotate(): number

  override dxfy(dx: Dxfier): void {
    super.dxfy(dx)
    dx.push(2, this.blockName)
    dx.point3d(this.definitionPoint)
    dx.point3d(this.middlePoint, 1)
    dx.push(70, this.dimensionType)
    dx.push(71, this.attachmentPoint)
    dx.push(72, this.textLineSpacingStyle)
    dx.push(41, this.textLineSpacingFactor)
    dx.push(42, this.ActualMeasurement)
    dx.push(1, this.text)
    dx.push(53, this.rotation === 'auto' ? this.rotate() : this.rotation)
    dx.push(51, this.horizontalDirection)
    dx.push(3, this.styleName)
  }
}
