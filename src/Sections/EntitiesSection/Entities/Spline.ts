import Entity, { options_t } from '../Entity';
import BoundingBox, { boundingBox_t } from '../../../Internals/BoundingBox';
import { Dxifier } from '../../../Internals/Dxifier';
import { vec3_t } from '../../../Internals/Utils';

export enum SplineFlags {
	Closed = 1,
	Periodic = 2,
	Rational = 4,
	Planar = 8,
	Linear = 16,
}

export type SplineArgs_t = {
	controlPoints: vec3_t[];
	fitPoints?: vec3_t[];
	degreeCurve?: number;
	flags?: SplineFlags;
	knots?: number[];
	weights?: number[];
};

export default class Spline extends Entity {
	controlPoints: vec3_t[];
	degreeCurve: number;
	knots: number[];
	weights: number[];
	flags: SplineFlags;
	fitPoints: vec3_t[];

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

	override dxify(dx: Dxifier): void {
		super.dxify(dx);
		dx.push(70, this.flags);
		dx.push(71, this.degreeCurve);
		dx.push(72, this.knots.length);
		dx.push(73, this.controlPoints.length);
		dx.push(74, this.fitPoints.length);
		dx.push(42, '0.0000001');
		dx.push(43, '0.0000001');
		dx.push(42, '0.0000000001');

		this.knots.forEach((k) => dx.push(40, k));
		this.controlPoints.forEach((cp) => dx.point3d(cp));
		this.fitPoints.forEach((fp) => {
			dx.push(11, fp.x);
			dx.push(21, fp.y);
			dx.push(31, fp.z);
		});
	}
}
