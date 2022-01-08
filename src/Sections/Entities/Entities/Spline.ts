import Entity, { options_t } from '../Entity';
import TagsManager, { point3d_t } from '../../../Internals/TagsManager';
import BoundingBox, { boundingBox_t } from '../../../Internals/BoundingBox';

export default class Spline extends Entity {
	private readonly _controlPoints: point3d_t[];
	private readonly _degreeCurve: number;
	private readonly _knots: number[];
	private readonly _weights: number[];
	private readonly _flag: number;
	private readonly _fitPoints: point3d_t[];

	public get fitPoints(): point3d_t[] {
		return this._fitPoints;
	}

	public get weights(): number[] {
		return this._weights;
	}

	public get knots(): number[] {
		return this._knots;
	}

	public get flag(): number {
		return this._flag;
	}

	public get degreeCurve(): number {
		return this._degreeCurve;
	}

	public get controlPoints(): point3d_t[] {
		return this._controlPoints;
	}

	public constructor(
		controlPoints: point3d_t[],
		fitPoints: point3d_t[] = [],
		degreeCurve: number = 3,
		flag: number = 8,
		knots: number[],
		weights: number[],
		options: options_t
	) {
		super('SPLINE', 'AcDbSpline', options);

		this._controlPoints = controlPoints;
		this._degreeCurve = degreeCurve;
		this._flag = flag;
		this._knots = knots;
		this._weights = weights;
		this._fitPoints = fitPoints;

		const knotsLength = this._degreeCurve + this._controlPoints.length + 1;

		if (this._knots.length === 0) {
			for (let i = 0; i < this._degreeCurve + 1; i++) {
				this._knots.push(0);
			}
			for (
				let i = 1;
				i < this._controlPoints.length - this._degreeCurve;
				i++
			) {
				this._knots.push(i);
			}
			for (let i = 0; i < this._degreeCurve + 1; i++) {
				this._knots.push(
					this._controlPoints.length - this._degreeCurve
				);
			}
		}

		if (this._knots.length !== knotsLength) {
			throw new Error(
				`Invalid knot vector length. Expected ${knotsLength} but received ${this._knots.length}.`
			);
		}
	}

	public boundingBox(): boundingBox_t {
		return BoundingBox.verticesBBox([
			...this.controlPoints,
			...this.fitPoints,
		]);
	}

	public get manager(): TagsManager {
		const manager = new TagsManager();
		manager.pushTags(super.manager.tags);
		manager.addTag(70, this.flag);
		manager.addTag(71, this.degreeCurve);
		manager.addTag(72, this.knots.length);
		manager.addTag(73, this.controlPoints.length);
		manager.addTag(74, this.fitPoints.length);
		manager.addTag(42, '0.0000001');
		manager.addTag(43, '0.0000001');
		manager.addTag(42, '0.0000000001');

		this._knots.forEach((knot) => {
			manager.addTag(40, knot);
		});
		this._controlPoints.forEach((point) => {
			manager.point3d(point);
		});
		this._fitPoints.forEach((point) => {
			manager.point3d(point, 1);
		});
		return manager;
	}
}
