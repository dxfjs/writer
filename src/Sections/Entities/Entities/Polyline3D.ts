import Entity from '../Entity';
import Vertex from './Vertex';
import SeqEnd from './SeqEnd';
import TagsManager, {
	createPoint3d,
	tag_t,
} from '../../../Internals/TagsManager';

export default class Polyline3D extends Entity {
	get flag(): number {
		return this._flag;
	}
	get points(): number[][] {
		return this._points;
	}

	private readonly _points: number[][];
	private readonly _flag: number;
	private _vertexes: Vertex[] = [];
	private readonly _seqEnd: SeqEnd = new SeqEnd();

	public constructor(points: number[][], flag: number) {
		super('POLYLINE', 'AcDb3dPolyline');

		this._points = points;
		this._flag = flag;

		this.points.forEach((point) => {
			const [x, y, z] = point;
			this._vertexes.push(new Vertex(createPoint3d(x, y, z), 32));
		});
	}

	public boundingBox() {
		const arrayX: number[] = [];
		const arrayY: number[] = [];
		this.points.forEach((point) => {
			const [x, y] = point;
			arrayX.push(x);
			arrayY.push(y);
		});
		const minX = Math.min(...arrayX);
		const maxX = Math.max(...arrayX);
		const minY = Math.min(...arrayY);
		const maxY = Math.max(...arrayY);
		return [
			[minX, maxY],
			[maxX, minY],
		];
	}

	public tags(): tag_t[] {
		const manager = new TagsManager();
		manager.pushTags(super.tags());
		manager.addTag(66, 1);
		manager.point3d(createPoint3d(0, 0, 0));
		manager.addTag(70, this.flag);
		this._vertexes.forEach((vertex) => {
			manager.pushTags(vertex.tags());
		});
		manager.pushTags(this._seqEnd.tags());
		return manager.tags;
	}
}
