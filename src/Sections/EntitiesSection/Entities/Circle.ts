import Entity, { options_t } from '../Entity';
import TagsManager, { point3d_t } from '../../../Internals/TagsManager';
import BoundingBox, { boundingBox_t } from '../../../Internals/BoundingBox';

export default class Circle extends Entity {
	center: point3d_t;
	radius: number;

	constructor(center: point3d_t, radius: number, options?: options_t) {
		super('CIRCLE', 'AcDbCircle', options);
		this.center = center;
		this.radius = radius;
	}

	override boundingBox(): boundingBox_t {
		return BoundingBox.centerRadiusBBox(this.center, this.radius);
	}

	override get manager(): TagsManager {
		const manager = new TagsManager();
		manager.push(super.manager.tags);
		manager.point3d(this.center);
		manager.add(40, this.radius);
		return manager;
	}
}
