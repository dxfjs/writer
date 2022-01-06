import Entity from '../Entity';
import TagsManager, {
	createPoint3d,
	point3d_t,
} from '../../../Internals/TagsManager';

export default class Face extends Entity {
	get fourth(): point3d_t {
		return this._fourth;
	}
	get third(): point3d_t {
		return this._third;
	}
	get second(): point3d_t {
		return this._second;
	}
	get first(): point3d_t {
		return this._first;
	}

	private readonly _first: point3d_t;
	private readonly _second: point3d_t;
	private readonly _third: point3d_t;
	private readonly _fourth: point3d_t;

	public constructor(
		first: point3d_t,
		second: point3d_t,
		third: point3d_t,
		fourth: point3d_t
	) {
		super('3DFACE', 'AcDbFace');
		this._first = first;
		this._second = second;
		this._third = third;
		this._fourth = fourth;
	}
	public boundingBox() {
		const arrayX = [
			this.first.x,
			this.second.x,
			this.third.x,
			this.fourth.x,
		];
		const arrayY = [
			this.first.y,
			this.second.y,
			this.third.y,
			this.fourth.y,
		];
		const minX = Math.min(...arrayX);
		const maxX = Math.max(...arrayX);
		const minY = Math.min(...arrayY);
		const maxY = Math.max(...arrayY);
		return [
			[minX, maxY],
			[maxX, minY],
		];
	}

	public get manager(): TagsManager {
		const manager = new TagsManager();
		manager.pushTags(super.manager.tags);
		manager.point3d(
			createPoint3d(this.first.x, this.first.y, this.first.z)
		);
		manager.point3d(
			createPoint3d(this.second.x, this.second.y, this.second.z),
			1
		);
		manager.point3d(
			createPoint3d(this.third.x, this.third.y, this.third.z),
			2
		);
		manager.point3d(
			createPoint3d(this.fourth.x, this.fourth.y, this.fourth.z),
			3
		);
		return manager;
	}
}
