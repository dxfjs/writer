import TagsManager, {
	point2d_t,
	point3d_t,
} from '../../../../Internals/TagsManager';
import DxfRecord from './DxfRecord';

export type ViewArgs = {
	name: string;
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
		if ('backgroundObjectHandle' in args)
			this.backgroundObjectHandle = args.backgroundObjectHandle;
		if ('liveSectionObjectHandle' in args)
			this.liveSectionObjectHandle = args.liveSectionObjectHandle;
		if ('visualStyleObjectHandle' in args)
			this.visualStyleObjectHandle = args.visualStyleObjectHandle;
	}

	override get manager(): TagsManager {
		const manager = new TagsManager();
		manager.push(super.manager.tags);
		manager.subclassMarker('AcDbViewTableRecord');
		manager.name(this.name);
		manager.add(70, 1);
		manager.add(40, this.viewHeight);
		manager.point2d(this.viewCenter);
		manager.add(41, this.viewWidth);
		manager.point3d(this.viewDirection, 1);
		manager.point3d(this.targetPoint, 2);
		manager.add(42, this.lensLength);
		manager.add(43, this.frontClipping);
		manager.add(44, this.backClipping);
		manager.add(50, this.twistAngle);
		manager.add(71, this.viewMode);
		manager.add(281, this.renderMode);
		manager.add(72, this.isUCSAssociated ? 1 : 0);
		manager.add(73, this.isCameraPlottable ? 1 : undefined);
		manager.add(332, this.backgroundObjectHandle);
		manager.add(334, this.liveSectionObjectHandle);
		manager.add(348, this.visualStyleObjectHandle);

		return manager;
	}
}
