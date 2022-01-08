import Entity, { options_t } from '../Entity';
import Vertex from './Vertex';
import SeqEnd from './SeqEnd';
import TagsManager, {
	point3d,
	point3d_t,
} from '../../../Internals/TagsManager';
import BoundingBox, { boundingBox_t } from '../../../Internals/BoundingBox';

export default class Polyline3D extends Entity {
	get flag(): number {
		return this._flag;
	}
	get points(): point3d_t[] {
		return this._points;
	}

	private readonly _points: point3d_t[];
	private readonly _flag: number;
	private _vertexes: Vertex[] = [];
	private readonly _seqEnd: SeqEnd = new SeqEnd({});

	public constructor(points: point3d_t[], flag: number, options: options_t) {
		super('POLYLINE', 'AcDb3dPolyline', options);

		this._points = points;
		this._flag = flag;

		this.points.forEach((point) => {
			this._vertexes.push(new Vertex(point, 32, {}));
		});
	}

	public boundingBox(): boundingBox_t {
		return BoundingBox.verticesBBox(this.points);
	}

	public get manager(): TagsManager {
		const manager = new TagsManager();
		manager.pushTags(super.manager.tags);
		manager.addTag(66, 1);
		manager.point3d(point3d(0, 0, 0));
		manager.addTag(70, this.flag);
		this._vertexes.forEach((vertex) => {
			manager.appendTags(vertex);
		});
		manager.appendTags(this._seqEnd);
		return manager;
	}
}
