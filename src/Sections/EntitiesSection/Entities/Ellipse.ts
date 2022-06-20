import Entity, { options_t } from '../Entity';
import TagsManager, { point3d_t } from '../../../Internals/TagsManager';
import BoundingBox, { boundingBox_t } from '../../../Internals/BoundingBox';

export default class Ellipse extends Entity {
	center: point3d_t;
	endPointOfMajorAxis: point3d_t;
	ratioOfMinorAxisToMajorAxis: number;
	startParameter: number;
	endParameter: number;

	constructor(
		center: point3d_t,
		endPointOfMajorAxis: point3d_t,
		ratioOfMinorAxisToMajorAxis: number,
		startParameter: number,
		endParameter: number,
		options?: options_t
	) {
		super('ELLIPSE', 'AcDbEllipse', options);
		this.center = center;
		this.endPointOfMajorAxis = endPointOfMajorAxis;
		this.ratioOfMinorAxisToMajorAxis = ratioOfMinorAxisToMajorAxis;
		this.startParameter = startParameter;
		this.endParameter = endParameter;
	}

	override boundingBox(): boundingBox_t {
		const x = this.center.x;
		const y = this.center.y;
		const xEndPointOfMajorAxis = this.endPointOfMajorAxis.x;
		const yEndPointOfMajorAxis = this.endPointOfMajorAxis.y;

		const bigRadius = Math.sqrt(
			Math.pow(x - (x + xEndPointOfMajorAxis), 2) +
				Math.pow(y - (y + yEndPointOfMajorAxis), 2)
		);
		return BoundingBox.centerRadiusBBox(this.center, bigRadius);
	}

	override get manager(): TagsManager {
		const [x, y, z] = [this.center.x, this.center.y, this.center.z];
		const manager = new TagsManager();
		manager.push(super.manager.tags);
		manager.point3d({ x, y, z });
		manager.point3d(this.endPointOfMajorAxis, 1);
		manager.add(40, this.ratioOfMinorAxisToMajorAxis);
		manager.add(41, this.startParameter);
		manager.add(42, this.endParameter);
		return manager;
	}
}
