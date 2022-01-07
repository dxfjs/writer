import Entity from '../Entity';
import TagsManager, { point3d_t } from '../../../Internals/TagsManager';
import BoundingBox, { boundingBox_t } from '../../../Internals/BoundingBox';

export default class Vertex extends Entity {
	get flag(): number {
		return this._flag;
	}
	get point(): point3d_t {
		return this._point;
	}
	private readonly _point: point3d_t;
	private readonly _flag: number;

	public constructor(point: point3d_t, flag: number) {
		super('VERTEX', 'AcDbVertex');
		this._point = point;
		this._flag = flag;
	}

	public boundingBox(): boundingBox_t {
		return BoundingBox.pointBBox(this.point);
	}

	public get manager(): TagsManager {
		const manager = new TagsManager();
		manager.pushTags(super.manager.tags);
		manager.subclassMarker('AcDb3dPolylineVertex'); // TODO Make this dynamic
		manager.point3d(this.point);
		manager.addTag(70, this.flag);
		return manager;
	}
}
