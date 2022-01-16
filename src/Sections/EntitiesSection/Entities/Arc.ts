import Entity, { options_t } from '../Entity';
import TagsManager, { point3d_t } from '../../../Internals/TagsManager';
import BoundingBox, { boundingBox_t } from '../../../Internals/BoundingBox';

export default class Arc extends Entity {
	readonly center: point3d_t;
	readonly radius: number;
	readonly startAngle: number;
	readonly endAngle: number;

	public constructor(
		center: point3d_t,
		radius: number,
		startAngle: number,
		endAngle: number,
		options: options_t
	) {
		super({ type: 'ARC', subclassMarker: 'AcDbCircle', options });
		this.center = center;
		this.radius = radius;
		this.startAngle = startAngle;
		this.endAngle = endAngle;
	}

	public boundingBox(): boundingBox_t {
		return BoundingBox.centerRadiusBBox(this.center, this.radius);
	}

	public override get manager(): TagsManager {
		const manager = new TagsManager();
		manager.pushTags(super.manager.tags);
		manager.point3d(this.center);
		manager.addTag(40, this.radius);
		manager.subclassMarker('AcDbArc');
		manager.addTag(50, this.startAngle);
		manager.addTag(51, this.endAngle);
		return manager;
	}
}
