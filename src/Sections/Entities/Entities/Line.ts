import Entity from '../Entity';
import TagsManager, {
	createPoint3d,
	point3d_t,
} from '../../../Internals/TagsManager';

export default class Line extends Entity {
	get start(): point3d_t {
		return this._start;
	}
	get end(): point3d_t {
		return this._end;
	}

	private readonly _start: point3d_t;
	private readonly _end: point3d_t;

	public constructor(start: point3d_t, end: point3d_t) {
		super('LINE', 'AcDbLine');
		this._start = start;
		this._end = end;
	}

	public boundingBox() {
		const xs: number[] = [];
		if (this.start.x < this.end.x) {
			xs.push(this.start.x, this.end.x);
		} else {
			xs.push(this.end.x, this.start.x);
		}
		const ys: number[] = [];
		if (this.start.y < this.end.y) {
			ys.push(this.start.y, this.end.y);
		} else {
			ys.push(this.end.y, this.start.y);
		}
		const [minX, maxX] = xs;
		const [minY, maxY] = ys;
		return [
			[minX, maxY],
			[maxX, minY],
		];
	}

	public get manager(): TagsManager {
		const manager = new TagsManager();
		manager.pushTags(super.manager.tags);
		manager.point3d(
			createPoint3d(this.start.x, this.start.y, this.start.z)
		);
		manager.point3d(createPoint3d(this.end.x, this.end.y, this.end.z), 1);
		return manager;
	}
}
