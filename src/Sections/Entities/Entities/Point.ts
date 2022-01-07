import Entity from '../Entity';
import TagsManager, { point3d } from '../../../Internals/TagsManager';
import BoundingBox, { boundingBox_t } from '../../../Internals/BoundingBox';

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

	public boundingBox(): boundingBox_t {
		return BoundingBox.pointBBox(point3d(this.x, this.y, this.z));
	}

	public get manager(): TagsManager {
		const manager = new TagsManager();
		manager.pushTags(super.manager.tags);
		manager.point3d(point3d(this.x, this.y, this.z));
		return manager;
	}
}
