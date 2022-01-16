import Entity, { options_t } from '../Entity';
import TagsManager, { point3d_t } from '../../../Internals/TagsManager';
import BoundingBox, { boundingBox_t } from '../../../Internals/BoundingBox';

export default class Face extends Entity {
	readonly firstCorner: point3d_t;
	readonly secondCorner: point3d_t;
	readonly thirdCorner: point3d_t;
	readonly fourthCorner: point3d_t;

	public constructor(
		firstCorner: point3d_t,
		secondCorner: point3d_t,
		thirdCorner: point3d_t,
		fourthCorner: point3d_t,
		options: options_t
	) {
		super({ type: '3DFACE', subclassMarker: 'AcDbFace', options });
		this.firstCorner = firstCorner;
		this.secondCorner = secondCorner;
		this.thirdCorner = thirdCorner;
		this.fourthCorner = fourthCorner;
	}

	public boundingBox(): boundingBox_t {
		return BoundingBox.verticesBBox([
			this.firstCorner,
			this.secondCorner,
			this.thirdCorner,
			this.fourthCorner,
		]);
	}

	public override get manager(): TagsManager {
		const manager = new TagsManager();
		manager.pushTags(super.manager.tags);
		manager.point3d(this.firstCorner);
		manager.point3d(this.secondCorner, 1);
		manager.point3d(this.thirdCorner, 2);
		manager.point3d(this.fourthCorner, 3);
		return manager;
	}
}
