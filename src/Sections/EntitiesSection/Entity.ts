import GlobalState from '../../GlobalState';
import { boundingBox_t } from '../../Internals/BoundingBox';
import Handle from '../../Internals/Handle';
import DxfInterface from '../../Internals/Interfaces/DxfInterface';
import TagsManager from '../../Internals/TagsManager';

/**
 * @public
 */
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
		this.layerName = GlobalState.currentLayerName;
		this.handle = Handle.next()
	}

	/**
	 * Get the boundingBox of an entity.
	 *
	 * @returns The boundingBox of an entity.
	 */
	public abstract boundingBox(): boundingBox_t;

	/**
	 * Get the array tags of the entity.
	 *
	 * @returns Array of Tag.
	 */
	public get manager(): TagsManager {
		const manager = new TagsManager();
		manager.entityType(this.type);
		manager.handle(this.handle);
		manager.addTag(330, this.ownerBlockRecord);
		manager.subclassMarker('AcDbEntity');
		manager.addTag(420, this.options.trueColor);
		manager.layerName(this.options.layerName || this.layerName);
		manager.lineType(this.options.lineType);
		manager.colorNumber(this.options.colorNumber);
		manager.addTag(48, this.options.lineTypeScale);
		manager.visibilty(this.options.visible);
		manager.subclassMarker(this.subclassMarker);
		return manager;
	}

	public stringify(): string {
		return this.manager.stringify();
	}
}
