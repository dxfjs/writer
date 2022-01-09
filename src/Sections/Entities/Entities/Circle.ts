import Entity, { options_t } from '../Entity';
import TagsManager, { point3d_t } from '../../../Internals/TagsManager';
import BoundingBox, { boundingBox_t } from '../../../Internals/BoundingBox';

export default class Circle extends Entity {
	private readonly _center: point3d_t;
	private readonly _radius: number;

	get radius(): number {
		return this._radius;
	}

	get center(): point3d_t {
		return this._center;
	}

	public constructor(center: point3d_t, radius: number, options: options_t) {
		super({ type: 'CIRCLE', subclassMarker: 'AcDbCircle', options });
		this._center = center;
		this._radius = radius;
	}

	public boundingBox(): boundingBox_t {
		return BoundingBox.centerRadiusBBox(this.center, this.radius);
	}

	public get manager(): TagsManager {
		const manager = new TagsManager();
		manager.pushTags(super.manager.tags);
		manager.point3d(this.center);
		manager.addTag(40, this.radius);
		return manager;
	}
}
