import Entity from '../Entity';
import TagsManager, {
	createPoint3d,
	tag_t,
} from '../../../Internals/TagsManager';

export default class Point extends Entity {
	get x(): number {
		return this._x;
	}
	get y(): number {
		return this._y;
	}
	get z(): number {
		return this._z;
	}

	private readonly _x: number;
	private readonly _y: number;
	private readonly _z: number;

	public constructor(x: number, y: number, z: number = 0) {
		super('POINT', 'AcDbPoint');
		this._x = x;
		this._y = y;
		this._z = z;
	}

	public boundingBox() {
		return [
			[this.x, this.y],
			[this.x, this.y],
		];
	}

	public tags(): tag_t[] {
		const manager = new TagsManager();
		manager.pushTags(super.tags());
		manager.point3d(createPoint3d(this.x, this.y, this.z));
		return manager.tags;
	}
}
