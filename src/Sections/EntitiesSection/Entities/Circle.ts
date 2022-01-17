import Entity, { options_t } from '../Entity';
import TagsManager, { point3d_t } from '../../../Internals/TagsManager';
import BoundingBox, { boundingBox_t } from '../../../Internals/BoundingBox';

export default class Circle extends Entity {
	readonly center: point3d_t;
	readonly radius: number;

	public constructor(center: point3d_t, radius: number, options?: options_t) {
		super('CIRCLE', 'AcDbCircle', options);
		this.center = center;
		this.radius = radius;
	}

	public boundingBox(): boundingBox_t {
		return BoundingBox.centerRadiusBBox(this.center, this.radius);
	}

	public override get manager(): TagsManager {
		const manager = new TagsManager();
		manager.pushTags(super.manager.tags);
		manager.point3d(this.center);
		manager.addTag(40, this.radius);
		return manager;
	}
}
