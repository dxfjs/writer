import GlobalState from '../../GlobalState';
import { boundingBox_t } from '../../Internals/BoundingBox';
import Handle from '../../Internals/Handle';
import DxfInterface from '../../Internals/Interfaces/DxfInterface';
import TagsManager from '../../Internals/TagsManager';

export default abstract class Entity extends Handle implements DxfInterface {
	protected readonly _type: string;
	protected readonly _subclassMarker: string | null;
	private readonly _layerName: string;

	public get layerName(): string {
		return this._layerName;
	}

	public get subclassMarker(): string | null {
		return this._subclassMarker;
	}

	public get type(): string {
		return this._type;
	}

	/**
	 * Entity class is the base class of all enities.
	 * @link http://help.autodesk.com/view/OARX/2018/ENU/?guid=GUID-7D07C886-FD1D-4A0C-A7AB-B4D21F18E484.
	 * @param type {string} The type of the entity example : LINE, POLYLINE, ARC, CIRCLE ....
	 * @param subclass
	 */
	public constructor(type: string, subclassMarker: string | null = null) {
		super();
		this._type = type;
		this._subclassMarker = subclassMarker;
		this._layerName = GlobalState.currentLayerName;
	}

	/**
	 * Get the boundingBox of an entity.
	 * @returns {number[][]}
	 */
	public abstract boundingBox(): boundingBox_t;

	/**
	 * get the array tags of the entity.
	 *
	 * @returns {Tag[]} Array of Tag.
	 */
	public get manager(): TagsManager {
		const manager = new TagsManager();
		manager.entityType(this._type);
		manager.handle(this.handle);
		manager.subclassMarker('AcDbEntity');
		if (!isNaN(GlobalState.currentTrueColor))
			manager.addTag(420, GlobalState.currentTrueColor);
		manager.layerName(this.layerName);
		if (this.subclassMarker) manager.subclassMarker(this.subclassMarker);
		return manager;
	}

	public stringify(): string {
		return this.manager.stringify();
	}
}
