import Entity, { options_t } from '../Entity';
import Vertex, { vertexFlags } from './Vertex';
import SeqEnd from './SeqEnd';
import TagsManager, {
	point3d,
	point3d_t,
} from '../../../Internals/TagsManager';
import BoundingBox, { boundingBox_t } from '../../../Internals/BoundingBox';

export default class Polyline extends Entity {
	vertices: point3d_t[];
	flag: number;
	vertexes: Vertex[] = [];
	#seqEnd: SeqEnd = new SeqEnd();

	public constructor(
		vertices: point3d_t[],
		flag: number,
		options?: options_t
	) {
		super('POLYLINE', 'AcDb3dPolyline', options);

		this.vertices = vertices;
		this.flag = flag;

		this.vertices.forEach((point) => {
			this.vertexes.push(
				new Vertex(point, {
					flags: vertexFlags.Polyline3dVertex,
					is3d: true,
				})
			);
		});
	}

	public boundingBox(): boundingBox_t {
		return BoundingBox.verticesBBox(this.vertices);
	}

	public override get manager(): TagsManager {
		const manager = new TagsManager();
		manager.pushTags(super.manager.tags);
		manager.addTag(66, 1);
		manager.point3d(point3d(0, 0, 0));
		manager.addTag(70, this.flag);
		this.vertexes.forEach((vertex) => {
			manager.appendTags(vertex);
		});
		manager.appendTags(this.#seqEnd);
		return manager;
	}
}
