import Entity, { options_t } from '../Entity';
import TagsManager, { point3d } from '../../../Internals/TagsManager';
import BoundingBox, { boundingBox_t } from '../../../Internals/BoundingBox';

export default class Point extends Entity {
	private readonly _x: number;
	private readonly _y: number;
	private readonly _z: number;

	public get x(): number {
		return this._x;
	}

	public get y(): number {
		return this._y;
	}

	public get z(): number {
		return this._z;
	}

	public constructor(x: number, y: number, z: number, options?: options_t) {
		super('POINT', 'AcDbPoint', options);
		this._x = x;
		this._y = y;
		this._z = z;
	}

	public boundingBox(): boundingBox_t {
		return BoundingBox.pointBBox(point3d(this.x, this.y, this.z));
	}

	public override get manager(): TagsManager {
		const manager = new TagsManager();
		manager.pushTags(super.manager.tags);
		manager.point3d(point3d(this.x, this.y, this.z));
		return manager;
	}
}
