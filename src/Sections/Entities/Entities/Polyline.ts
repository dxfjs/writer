import Entity from '../Entity';
import TagsManager, {
	point3d,
	point2d_t,
} from '../../../Internals/TagsManager';
import BoundingBox, { boundingBox_t } from '../../../Internals/BoundingBox';

export default class Polyline extends Entity {
	get flag(): number {
		return this._flag;
	}
	get points(): point2d_t[] {
		return this._points;
	}

	private readonly _points: point2d_t[];
	private readonly _flag: number;

	public constructor(points: point2d_t[], flag: number) {
		super('LWPOLYLINE', 'AcDbPolyline');
		this._points = points;
		this._flag = flag;
	}

	public boundingBox(): boundingBox_t {
		return BoundingBox.verticesBBox(
			this.points.map((p) => point3d(p.x, p.y, 0))
		);
	}

	public get manager(): TagsManager {
		const manager = new TagsManager();
		manager.pushTags(super.manager.tags);
		manager.addTag(90, this.points.length);
		manager.addTag(70, this.flag);
		this.points.forEach((point) => {
			manager.point2d(point);
		});
		return manager;
	}
}
