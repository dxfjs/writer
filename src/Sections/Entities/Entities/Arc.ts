import Point from './Point';
import Entity from '../Entity';
import TagsManager, { point3d_t, tag_t } from '../../../Internals/TagsManager';

export default class Arc extends Entity {
	private readonly _center: point3d_t;
	private readonly _radius: number;
	private readonly _startAngle: number;
	private readonly _endAngle: number;

	get endAngle(): number {
		return this._endAngle;
	}
	get startAngle(): number {
		return this._startAngle;
	}
	get radius(): number {
		return this._radius;
	}
	get center(): point3d_t {
		return this._center;
	}

	public constructor(
		center: Point,
		radius: number,
		startAngle: number,
		endAngle: number
	) {
		super('ARC', 'AcDbCircle');
		this._center = center;
		this._radius = radius;
		this._startAngle = startAngle;
		this._endAngle = endAngle;
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
		manager.subclassMarker('AcDbArc');
		manager.addTag(50, this.startAngle);
		manager.addTag(51, this.endAngle);
		return manager.tags;
	}
}
