import Entity from '../Entity';
import TagsManager, {
	createPoint2d,
	tag_t,
} from '../../../Internals/TagsManager';

export default class Polyline extends Entity {
	get flag(): number {
		return this._flag;
	}
	get points(): number[][] {
		return this._points;
	}

	private readonly _points: number[][];
	private readonly _flag: number;

	public constructor(points: number[][], flag: number) {
		super('LWPOLYLINE', 'AcDbPolyline');
		this._points = points;
		this._flag = flag;
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
		manager.addTag(90, this.points.length);
		manager.addTag(70, this.flag);
		this.points.forEach((point) => {
			const [x, y] = point;
			manager.point2d(createPoint2d(x, y));
		});
		return manager.tags;
	}
}
