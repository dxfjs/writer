import BoundingBox, { boundingBox_t } from '../../../Internals/BoundingBox';
import { Dxifier } from '../../../Internals/Dxifier';
import { point3d_t } from '../../../Internals/Utils';
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

	override dxify(dx: Dxifier): void {
		super.dxify(dx);
		dx.point3d(this.position);
		dx.push(40, this.height);
		dx.primaryText(this.value);
		dx.textStyle(this.textStyle);
		dx.subclassMarker('AcDbText');
	}
}
