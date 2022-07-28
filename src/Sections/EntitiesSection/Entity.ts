import BoundingBox, { boundingBox_t } from '../../Internals/BoundingBox';
import { Dxifier, point3d } from '../../Internals/Dxifier';
import Handle from '../../Internals/Handle';
import DxfInterface from '../../Internals/Interfaces/DxfInterface';

export type options_t = {
	trueColor?: string;
	colorNumber?: number;
	layerName?: string;
	visible?: boolean;
	lineType?: string;
	lineTypeScale?: number;
};

export default abstract class Entity implements DxfInterface {
	type: string;
	subclassMarker: string | undefined;
	layerName: string;
	options: options_t;
	ownerBlockRecord?: string;
	readonly handle: string;

	/**
	 * Entity class is the base class of all enities.
	 * [DXF Entities](http://help.autodesk.com/view/OARX/2018/ENU/?guid=GUID-7D07C886-FD1D-4A0C-A7AB-B4D21F18E484)
	 * @param type - The type of the entity example : LINE, POLYLINE, ARC, CIRCLE ....
	 * @param subclassMarker - The subclass marker of the entity.
	 * @param options - The common options of all entities.
	 */
	public constructor(
		type: string,
		subclassMarker?: string,
		options?: options_t
	) {
		this.options = options || {};
		this.type = type;
		this.subclassMarker = subclassMarker;
		this.layerName = options?.layerName || '0';
		this.handle = Handle.next();
	}

	/**
	 * Get the boundingBox of an entity.
	 *
	 * @returns The boundingBox of an entity.
	 */
	public boundingBox(): boundingBox_t {
		return BoundingBox.pointBBox(point3d(0, 0, 0));
	}

	dxify(mg: Dxifier) {
		mg.type(this.type);
		mg.handle(this.handle);
		mg.push(330, this.ownerBlockRecord);
		mg.subclassMarker('AcDbEntity');
		mg.push(420, this.options.trueColor);
		mg.layerName(this.options.layerName || this.layerName);
		mg.lineType(this.options.lineType);
		mg.colorNumber(this.options.colorNumber);
		mg.push(48, this.options.lineTypeScale);
		mg.visibilty(this.options.visible);
		mg.subclassMarker(this.subclassMarker);
	}
}
