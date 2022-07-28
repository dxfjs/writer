import { Dxifier, point2d_t, point3d_t } from '../../../../Internals/Dxifier';
import DxfRecord, { ViewFlags } from './DxfRecord';

export type ViewArgs = {
	name: string;
	flags?: ViewFlags;
	viewHeight: number;
	viewCenter: point2d_t;
	viewWidth: number;
	viewDirection: point3d_t;
	targetPoint: point3d_t;
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
	name: string;
	flags: ViewFlags;
	viewHeight: number;
	viewCenter: point2d_t;
	viewWidth: number;
	viewDirection: point3d_t;
	targetPoint: point3d_t;
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

	constructor(args: ViewArgs) {
		super('VIEW');
		this.name = args.name;
		this.flags = args.flags ?? ViewFlags.None;
		this.viewHeight = args.viewHeight;
		this.viewCenter = args.viewCenter;
		this.viewWidth = args.viewWidth;
		this.viewDirection = args.viewDirection;
		this.targetPoint = args.targetPoint;
		this.lensLength = args.lensLength;
		this.frontClipping = args.frontClipping;
		this.backClipping = args.backClipping;
		this.twistAngle = args.twistAngle;
		this.viewMode = args.viewMode;
		this.renderMode = args.renderMode;
		this.isUCSAssociated = args.isUCSAssociated;
		this.isCameraPlottable = args.isCameraPlottable || false;

		args.backgroundObjectHandle &&
			(this.backgroundObjectHandle = args.backgroundObjectHandle);
		args.liveSectionObjectHandle &&
			(this.liveSectionObjectHandle = args.liveSectionObjectHandle);
		args.visualStyleObjectHandle &&
			(this.visualStyleObjectHandle = args.visualStyleObjectHandle);
	}

	dxify(mg: Dxifier): void {
		super.dxify(mg);
		mg.subclassMarker('AcDbViewTableRecord');
		mg.name(this.name);
		mg.push(70, this.flags);
		mg.push(40, this.viewHeight);
		mg.point2d(this.viewCenter);
		mg.push(41, this.viewWidth);
		mg.point3d(this.viewDirection, 1);
		mg.point3d(this.targetPoint, 2);
		mg.push(42, this.lensLength);
		mg.push(43, this.frontClipping);
		mg.push(44, this.backClipping);
		mg.push(50, this.twistAngle);
		mg.push(71, this.viewMode);
		mg.push(281, this.renderMode);
		mg.push(72, this.isUCSAssociated ? 1 : 0);
		mg.push(73, this.isCameraPlottable ? 1 : undefined);
		mg.push(332, this.backgroundObjectHandle);
		mg.push(334, this.liveSectionObjectHandle);
		mg.push(348, this.visualStyleObjectHandle);
	}
}
