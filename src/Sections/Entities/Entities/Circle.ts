import Point from './Point';
import Entity from '../Entity';
import TagsManager, { tag_t } from '../../../Internals/TagsManager';

export default class Circle extends Entity {
	private readonly _center: Point;
	private readonly _radius: number;

	get radius(): number {
		return this._radius;
	}

	get center(): Point {
		return this._center;
	}

	public constructor(center: Point, radius: number) {
		super('CIRCLE', 'AcDbCircle');
		this._center = center;
		this._radius = radius;
	}

	public boundingBox() {
		return [
			[this.center.x - this.radius, this.center.y + this.radius],
			[this.center.x + this.radius, this.center.y - this.radius],
		];
	}

	public tags(): tag_t[] {
		const [x, y, z] = [this.center.x, this.center.y, this.center.z];
		const manager = new TagsManager();
		manager.pushTags(super.tags());
		manager.point3d({ x, y, z });
		manager.addTag(40, this.radius);
		return manager.tags;
	}
}
