import { BoundingBox, boundingBox_t } from 'Internals/BoundingBox'
import Entity, { CommonEntityOptions } from '../Entity'

import { Dxfier } from 'Internals/Dxfier'
import { vec3_t } from 'Internals/Helpers'

export enum TextGenerationFlags {
	None = 0,
	Backward = 2,
	UpsideDown = 4,
}

export enum TextHorizontalAlignment {
	Left = 0,
	Center = 1,
	Right = 2,
	Aligned = 3,
	Middle = 4,
	Fit = 5,
}

export enum TextVerticalAlignment {
	BaseLine = 0,
	Bottom = 1,
	Middle = 2,
	Top = 3,
}

export interface TextOptions extends CommonEntityOptions {
	rotation?: number;
	obliqueAngle?: number;
	generationFlags?: TextGenerationFlags;
	horizontalAlignment?: TextHorizontalAlignment;
	verticalAlignment?: TextVerticalAlignment;
	secondAlignmentPoint?: vec3_t;
	relativeXScaleFactor?: number;
}

export class Text extends Entity {
  position: vec3_t
  height: number
  value: string
  textStyle: string

  rotation?: number
  obliqueAngle?: number
  generationFlags?: TextGenerationFlags
  horizontalAlignment?: TextHorizontalAlignment
  verticalAlignment?: TextVerticalAlignment
  secondAlignmentPoint?: vec3_t
  relativeXScaleFactor?: number

  constructor(firstAlignmentPoint: vec3_t, height: number, value: string, options?: TextOptions) {
    super('TEXT', 'AcDbText', options)
    this.position = firstAlignmentPoint
    this.height = height
    this.value = value
    this.textStyle = 'STANDARD'
    this.rotation = options?.rotation
    this.obliqueAngle = options?.obliqueAngle
    this.generationFlags = options?.generationFlags
    this.horizontalAlignment = options?.horizontalAlignment
    this.verticalAlignment = options?.verticalAlignment
    this.secondAlignmentPoint = options?.secondAlignmentPoint
    this.relativeXScaleFactor = options?.relativeXScaleFactor
  }

  override boundingBox(): boundingBox_t {
    // I have no idea how to get boundingBox of TEXT :(
    return BoundingBox.pointBBox(this.position)
  }

  override dxfy(dx: Dxfier): void {
    super.dxfy(dx)
    dx.point3d(this.position)
    dx.push(40, this.height)
    dx.primaryText(this.value)
    dx.push(50, this.rotation)
    dx.push(41, this.relativeXScaleFactor)
    dx.push(51, this.obliqueAngle)
    dx.textStyle(this.textStyle)
    dx.push(71, this.generationFlags)
    dx.push(72, this.horizontalAlignment)
    if (this.secondAlignmentPoint) {
      dx.push(11, this.secondAlignmentPoint.x)
      dx.push(21, this.secondAlignmentPoint.y)
      dx.push(31, this.secondAlignmentPoint.z)
    }
    dx.subclassMarker('AcDbText')
    dx.push(73, this.verticalAlignment)
  }
}
