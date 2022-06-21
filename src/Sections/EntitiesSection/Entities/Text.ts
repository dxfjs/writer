import BoundingBox, { boundingBox_t } from '../../../Internals/BoundingBox';
import TagsManager, { point3d_t } from '../../../Internals/TagsManager';
import Entity, { options_t } from '../Entity';

export default class Text extends Entity {
	position: point3d_t;
	height: number;
	value: string;
	textStyle: string;

	constructor(
		position: point3d_t,
		height: number,
		value: string,
		options?: options_t
	) {
		super('TEXT', 'AcDbText', options);
		this.position = position;
		this.height = height;
		this.value = value;
		this.textStyle = 'STANDARD';
	}

	override boundingBox(): boundingBox_t {
		// I have no idea how to get boundingBox of TEXT :(
		return BoundingBox.pointBBox(this.position);
	}

	override get manager(): TagsManager {
		const manager = new TagsManager();
		manager.push(super.manager.tags);
		manager.point3d(this.position);
		manager.add(40, this.height);
		manager.primaryText(this.value);
		manager.textStyle(this.textStyle);
		manager.subclassMarker('AcDbText');
		return manager;
	}
}
