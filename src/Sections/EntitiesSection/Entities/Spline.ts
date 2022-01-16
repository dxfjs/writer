import Entity, { options_t } from '../Entity';
import TagsManager, { point3d_t } from '../../../Internals/TagsManager';
import BoundingBox, { boundingBox_t } from '../../../Internals/BoundingBox';

export type SplineArgs = {
	controlPoints: point3d_t[];
	fitPoints?: point3d_t[];
	degreeCurve?: number;
	flags?: number;
	knots?: number[];
	weights?: number[];
};

export default class Spline extends Entity {
	readonly controlPoints: point3d_t[];
	readonly degreeCurve: number;
	readonly knots: number[];
	readonly weights: number[];
	readonly flags: number;
	readonly fitPoints: point3d_t[];

	public constructor(args: SplineArgs, options: options_t) {
		super({ type: 'SPLINE', subclassMarker: 'AcDbSpline', options });

		this.controlPoints = args.controlPoints;
		this.degreeCurve = args.degreeCurve ?? 3;
		this.flags = args.flags ?? 8;
		this.knots = args.knots ?? [];
		this.weights = args.weights ?? [];
		this.fitPoints = args.fitPoints ?? [];

		const knotsLength = this.degreeCurve + this.controlPoints.length + 1;

		if (this.knots.length === 0) {
			for (let i = 0; i < this.degreeCurve + 1; i++) {
				this.knots.push(0);
			}
			for (
				let i = 1;
				i < this.controlPoints.length - this.degreeCurve;
				i++
			) {
				this.knots.push(i);
			}
			for (let i = 0; i < this.degreeCurve + 1; i++) {
				this.knots.push(this.controlPoints.length - this.degreeCurve);
			}
		}

		if (this.knots.length !== knotsLength) {
			throw new Error(
				`Invalid knot vector length. Expected ${knotsLength} but received ${this.knots.length}.`
			);
		}
	}

	public boundingBox(): boundingBox_t {
		return BoundingBox.verticesBBox([
			...this.controlPoints,
			...this.fitPoints,
		]);
	}

	public override get manager(): TagsManager {
		const manager = new TagsManager();
		manager.pushTags(super.manager.tags);
		manager.addTag(70, this.flags);
		manager.addTag(71, this.degreeCurve);
		manager.addTag(72, this.knots.length);
		manager.addTag(73, this.controlPoints.length);
		manager.addTag(74, this.fitPoints.length);
		manager.addTag(42, '0.0000001');
		manager.addTag(43, '0.0000001');
		manager.addTag(42, '0.0000000001');

		this.knots.forEach((knot) => {
			manager.addTag(40, knot);
		});
		this.controlPoints.forEach((point) => {
			manager.point3d(point);
		});
		this.fitPoints.forEach((point) => {
			manager.point3d(point, 1);
		});
		return manager;
	}
}
