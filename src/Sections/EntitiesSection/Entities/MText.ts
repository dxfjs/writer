import { BoundingBox, boundingBox_t } from 'Internals/BoundingBox'
import Entity, { CommonEntityOptions } from '../Entity'

import { Dxfier } from 'Internals/Dxfier'
import { vec3_t } from 'Internals/Helpers'

// TODO: we need to add columns in mtext

export enum MTextAttachmentPoint {
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

export enum MTextDrawingDirection {
  LeftToRight = 1,
  TopToBottom = 3,
  ByStyle = 5, // the flow direction is inherited from the associated text style
}

export enum MTextLineSpacingStyle {
  AtLeast = 1,
  Exact = 2,
}

export interface MTextOptions extends CommonEntityOptions {
  rotation?: number;
  attachmentPoint?: MTextAttachmentPoint;
  drawingDirection?: MTextDrawingDirection;
  lineSpacingStyle?: MTextLineSpacingStyle;
  width?: number;
}

export class MText extends Entity {
  position: vec3_t
  height: number
  value: string
  textStyle: string

  rotation?: number
  attachmentPoint?: MTextAttachmentPoint
  drawingDirection?: MTextDrawingDirection
  lineSpacingStyle?: MTextLineSpacingStyle
  width?: number

  constructor(firstAlignmentPoint: vec3_t, height: number, value: string, options?: MTextOptions) {
    super('MTEXT', 'AcDbMText', options)
    this.position = firstAlignmentPoint
    this.height = height
    this.value = value
    this.textStyle = 'STANDARD'
    this.rotation = options?.rotation
    this.attachmentPoint = options?.attachmentPoint
    this.drawingDirection = options?.drawingDirection
    this.lineSpacingStyle = options?.lineSpacingStyle
    this.width = options?.width
  }

  override boundingBox(): boundingBox_t {
    // I have no idea how to get boundingBox of TEXT :(
    return BoundingBox.pointBBox(this.position)
  }

  override dxfy(dx: Dxfier): void {
    super.dxfy(dx)
    dx.point3d(this.position)
    dx.push(40, this.height)
    dx.push(41, this.width)
    dx.push(71, this.attachmentPoint)
    dx.push(72, this.drawingDirection)
    dx.push(73, this.lineSpacingStyle)
    dx.primaryText(this.value)
    dx.push(50, this.rotation)
    dx.textStyle(this.textStyle)
  }
}
