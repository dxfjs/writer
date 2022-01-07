import BoundingBox, { boundingBox_t } from '../../../Internals/BoundingBox';
import TagsManager, { point3d_t } from '../../../Internals/TagsManager';
import Entity from '../Entity';

export default class Text extends Entity {
	get value(): string {
		return this._value;
	}
	get height(): number {
		return this._height;
	}
	get position(): point3d_t {
		return this._position;
	}
	private readonly _position: point3d_t;
	private readonly _height: number;
	private readonly _value: string;
	public constructor(position: point3d_t, height: number, value: string) {
		super('TEXT', 'AcDbText');
		this._position = position;
		this._height = height;
		this._value = value;
	}

	public boundingBox(): boundingBox_t {
		// I have no idea how to get boundingBox of TEXT :(
		return BoundingBox.pointBBox(this.position);
	}

	public get manager(): TagsManager {
		const manager = new TagsManager();
		manager.pushTags(super.manager.tags);
		manager.point3d(this.position);
		manager.addTag(40, this.height);
		manager.addTag(1, this.value);
		manager.subclassMarker('AcDbText');
		return manager;
	}
}
