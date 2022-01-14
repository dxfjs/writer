import Entity, { options_t } from '../Entity';
import Vertex, { vertexFlags } from './Vertex';
import SeqEnd from './SeqEnd';
import TagsManager, {
	point3d,
	point3d_t,
} from '../../../Internals/TagsManager';
import BoundingBox, { boundingBox_t } from '../../../Internals/BoundingBox';

export default class Polyline extends Entity {
	private readonly _vertices: point3d_t[];
	private readonly _flag: number;
	private _vertexes: Vertex[] = [];
	private readonly _seqEnd: SeqEnd = new SeqEnd({});

	public get flag(): number {
		return this._flag;
	}

	public get vertices(): point3d_t[] {
		return this._vertices;
	}

	public constructor(
		vertices: point3d_t[],
		flag: number,
		options: options_t
	) {
		super({ type: 'POLYLINE', subclassMarker: 'AcDb3dPolyline', options });

		this._vertices = vertices;
		this._flag = flag;

		this.vertices.forEach((point) => {
			this._vertexes.push(
				new Vertex(point, { flags: vertexFlags.polyline3dVertex })
			);
		});
	}

	public boundingBox(): boundingBox_t {
		return BoundingBox.verticesBBox(this.vertices);
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
