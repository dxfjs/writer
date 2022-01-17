import BoundingBox, { boundingBox_t } from '../../../Internals/BoundingBox';
import TagsManager, { point3d_t } from '../../../Internals/TagsManager';
import Entity, { options_t } from '../Entity';

export default class Text extends Entity {
	readonly position: point3d_t;
	readonly height: number;
	readonly value: string;

	public constructor(
		position: point3d_t,
		height: number,
		value: string,
		options?: options_t
	) {
		super('TEXT', 'AcDbText', options);
		this.position = position;
		this.height = height;
		this.value = value;
	}

	public boundingBox(): boundingBox_t {
		// I have no idea how to get boundingBox of TEXT :(
		return BoundingBox.pointBBox(this.position);
	}

	public override get manager(): TagsManager {
		const manager = new TagsManager();
		manager.pushTags(super.manager.tags);
		manager.point3d(this.position);
		manager.addTag(40, this.height);
		manager.addTag(1, this.value);
		manager.subclassMarker('AcDbText');
		return manager;
	}
}
