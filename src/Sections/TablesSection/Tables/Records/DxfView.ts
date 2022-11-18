import DxfRecord, { ViewFlags } from './DxfRecord'
import { vec2_t, vec3_t } from 'Internals/Helpers'

import { Dxfier } from 'Internals/Dxfier'

export type ViewArgs = {
	name: string;
	flags?: ViewFlags;
	viewHeight: number;
	viewCenter: vec2_t;
	viewWidth: number;
	viewDirection: vec3_t;
	targetPoint: vec3_t;
	lensLength: number;
	frontClipping: number;
	backClipping: number;
	twistAngle: number;
	viewMode: number;
	renderMode: number;
	isUCSAssociated: boolean;
	isCameraPlottable?: boolean;
	backgroundObjectHandle?: string;
	liveSectionObjectHandle?: string;
	visualStyleObjectHandle?: string;
};

export default class DxfView extends DxfRecord {
  name: string
  flags: ViewFlags
  viewHeight: number
  viewCenter: vec2_t
  viewWidth: number
  viewDirection: vec3_t
  targetPoint: vec3_t
  lensLength: number
  frontClipping: number
  backClipping: number
  twistAngle: number
  viewMode: number
  renderMode: number
  isUCSAssociated: boolean
  isCameraPlottable?: boolean
  backgroundObjectHandle?: string
  liveSectionObjectHandle?: string
  visualStyleObjectHandle?: string

  constructor(args: ViewArgs) {
    super('VIEW')
    this.name = args.name
    this.flags = args.flags ?? ViewFlags.None
    this.viewHeight = args.viewHeight
    this.viewCenter = args.viewCenter
    this.viewWidth = args.viewWidth
    this.viewDirection = args.viewDirection
    this.targetPoint = args.targetPoint
    this.lensLength = args.lensLength
    this.frontClipping = args.frontClipping
    this.backClipping = args.backClipping
    this.twistAngle = args.twistAngle
    this.viewMode = args.viewMode
    this.renderMode = args.renderMode
    this.isUCSAssociated = args.isUCSAssociated
    this.isCameraPlottable = args.isCameraPlottable || false

    args.backgroundObjectHandle && (this.backgroundObjectHandle = args.backgroundObjectHandle)
    args.liveSectionObjectHandle &&
			(this.liveSectionObjectHandle = args.liveSectionObjectHandle)
    args.visualStyleObjectHandle &&
			(this.visualStyleObjectHandle = args.visualStyleObjectHandle)
  }

  override dxfy(dx: Dxfier): void {
    super.dxfy(dx)
    dx.subclassMarker('AcDbViewTableRecord')
    dx.name(this.name)
    dx.push(70, this.flags)
    dx.push(40, this.viewHeight)
    dx.point2d(this.viewCenter)
    dx.push(41, this.viewWidth)
    dx.push(11, this.viewDirection.x)
    dx.push(21, this.viewDirection.y)
    dx.push(31, this.viewDirection.z)
    dx.push(12, this.targetPoint.x)
    dx.push(22, this.targetPoint.y)
    dx.push(32, this.targetPoint.z)
    dx.push(42, this.lensLength)
    dx.push(43, this.frontClipping)
    dx.push(44, this.backClipping)
    dx.push(50, this.twistAngle)
    dx.push(71, this.viewMode)
    dx.push(281, this.renderMode)
    dx.push(72, this.isUCSAssociated ? 1 : 0)
    dx.push(73, this.isCameraPlottable ? 1 : undefined)
    dx.push(332, this.backgroundObjectHandle)
    dx.push(334, this.liveSectionObjectHandle)
    dx.push(348, this.visualStyleObjectHandle)
  }
}
