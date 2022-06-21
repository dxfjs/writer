import Entity, { options_t } from '../Entity';
import TagsManager, { point3d_t } from '../../../Internals/TagsManager';
import BoundingBox, { boundingBox_t } from '../../../Internals/BoundingBox';

export enum SplineFlags {
	Closed = 1,
	Periodic = 2,
	Rational = 4,
	Planar = 8,
	Linear = 16,
}

export type SplineArgs_t = {
	controlPoints: point3d_t[];
	fitPoints?: point3d_t[];
	degreeCurve?: number;
	flags?: SplineFlags;
	knots?: number[];
	weights?: number[];
};

export default class Spline extends Entity {
	controlPoints: point3d_t[];
	degreeCurve: number;
	knots: number[];
	weights: number[];
	flags: SplineFlags;
	fitPoints: point3d_t[];

	constructor(splineArgs: SplineArgs_t, options?: options_t) {
		super('SPLINE', 'AcDbSpline', options);

		this.controlPoints = splineArgs.controlPoints;
		this.degreeCurve = splineArgs.degreeCurve ?? 3;
		this.flags = splineArgs.flags ?? SplineFlags.Planar;
		this.knots = splineArgs.knots || [];
		this.weights = splineArgs.weights || [];
		this.fitPoints = splineArgs.fitPoints || [];

		const cpl = this.controlPoints.length;
		const dc = this.degreeCurve;
		const edc = dc + 1; // Expected number fo control points.
		const fpl = this.fitPoints.length;

		if (cpl < edc)
			throw new Error(`Number of control points should be >= ${edc}.`);

		if (fpl !== 0 && fpl < 2)
			throw new Error(`Number of fit points should be >= 2.`);

		const eknl = dc + cpl + 1; // Expected knots length.

		if (this.knots.length === 0) {
			for (let i = 0; i < edc; i++) {
				this.knots.push(0);
			}
			for (let i = 1; i < cpl - dc; i++) {
				this.knots.push(i);
			}
			for (let i = 0; i < edc; i++) {
				this.knots.push(cpl - dc);
			}
		}

		if (this.knots.length !== eknl) {
			throw new Error(`Number of knots should be ${eknl}.`);
		}
	}

	override boundingBox(): boundingBox_t {
		return BoundingBox.verticesBBox([
			...this.controlPoints,
			...this.fitPoints,
		]);
	}

	override get manager(): TagsManager {
		const manager = new TagsManager();
		manager.push(super.manager.tags);
		manager.add(70, this.flags);
		manager.add(71, this.degreeCurve);
		manager.add(72, this.knots.length);
		manager.add(73, this.controlPoints.length);
		manager.add(74, this.fitPoints.length);
		manager.add(42, '0.0000001');
		manager.add(43, '0.0000001');
		manager.add(42, '0.0000000001');

		this.knots.forEach((knot) => {
			manager.add(40, knot);
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
