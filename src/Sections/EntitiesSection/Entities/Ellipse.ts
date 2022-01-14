import Entity, { options_t } from '../Entity';
import TagsManager, { point3d_t } from '../../../Internals/TagsManager';
import BoundingBox, { boundingBox_t } from '../../../Internals/BoundingBox';

export default class Ellipse extends Entity {
	private readonly _center: point3d_t;
	private readonly _endPointOfMajorAxis: point3d_t;
	private readonly _ratioOfMinorAxisToMajorAxis: number;
	private readonly _startParameter: number;
	private readonly _endParameter: number;

	public get endParameter(): number {
		return this._endParameter;
	}

	public get startParameter(): number {
		return this._startParameter;
	}

	public get ratioOfMinorAxisToMajorAxis(): number {
		return this._ratioOfMinorAxisToMajorAxis;
	}

	public get endPointOfMajorAxis(): point3d_t {
		return this._endPointOfMajorAxis;
	}

	public get center(): point3d_t {
		return this._center;
	}

	public constructor(
		center: point3d_t,
		endPointOfMajorAxis: point3d_t,
		ratioOfMinorAxisToMajorAxis: number,
		startParameter: number,
		endParameter: number,
		options: options_t
	) {
		super({ type: 'ELLIPSE', subclassMarker: 'AcDbEllipse', options });
		this._center = center;
		this._endPointOfMajorAxis = endPointOfMajorAxis;
		this._ratioOfMinorAxisToMajorAxis = ratioOfMinorAxisToMajorAxis;
		this._startParameter = startParameter;
		this._endParameter = endParameter;
	}

	public boundingBox(): boundingBox_t {
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

	public get manager(): TagsManager {
		const [x, y, z] = [this.center.x, this.center.y, this.center.z];
		const manager = new TagsManager();
		manager.pushTags(super.manager.tags);
		manager.point3d({ x, y, z });
		manager.point3d(this.endPointOfMajorAxis, 1);
		manager.addTag(40, this.ratioOfMinorAxisToMajorAxis);
		manager.addTag(41, this.startParameter);
		manager.addTag(42, this.endParameter);
		return manager;
	}
}
