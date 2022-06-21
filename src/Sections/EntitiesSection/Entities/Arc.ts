import Entity, { options_t } from '../Entity';
import TagsManager, { point3d_t } from '../../../Internals/TagsManager';
import BoundingBox, { boundingBox_t } from '../../../Internals/BoundingBox';

export default class Arc extends Entity {
	center: point3d_t;
	radius: number;
	startAngle: number;
	endAngle: number;

	constructor(
		center: point3d_t,
		radius: number,
		startAngle: number,
		endAngle: number,
		options?: options_t
	) {
		super('ARC', 'AcDbCircle', options);
		this.center = center;
		this.radius = radius;
		this.startAngle = startAngle;
		this.endAngle = endAngle;
	}

	override boundingBox(): boundingBox_t {
		return BoundingBox.centerRadiusBBox(this.center, this.radius);
	}

	override get manager(): TagsManager {
		const manager = new TagsManager();
		manager.push(super.manager.tags);
		manager.point3d(this.center);
		manager.add(40, this.radius);
		manager.subclassMarker('AcDbArc');
		manager.add(50, this.startAngle);
		manager.add(51, this.endAngle);
		return manager;
	}
}
