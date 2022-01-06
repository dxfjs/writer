import Entity, { SplineFlags } from '../Entity';
import TagsManager, { createPoint3d } from '../../../Internals/TagsManager';

export default class Spline extends Entity {
	private readonly _controlPoints: number[][];
	private readonly _degreeCurve: number;
	private readonly _knots: number[];
	private readonly _weights: number[];
	private readonly _flag: SplineFlags;
	private readonly _fitPoints: number[][];

	public get fitPoints(): number[][] {
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

	public get controlPoints(): number[][] {
		return this._controlPoints;
	}

	public constructor(
		controlPoints: number[][],
		fitPoints: number[][] = [],
		degreeCurve: number = 3,
		flag: SplineFlags = SplineFlags.Planar,
		knots: number[] = [],
		weights: number[] = []
	) {
		super('SPLINE', 'AcDbSpline');

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

	public boundingBox() {
		const arrayX: number[] = [];
		const arrayY: number[] = [];

		this._controlPoints.forEach((control_point) => {
			const [x, y] = control_point;
			arrayX.push(x);
			arrayY.push(y);
		});

		const minX = Math.min(...arrayX);
		const maxX = Math.max(...arrayX);
		const minY = Math.min(...arrayY);
		const maxY = Math.max(...arrayY);

		return [
			[minX, maxY],
			[maxX, minY],
		];
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
			const [x, y, z] = point;
			manager.point3d(createPoint3d(x, y, z));
		});
		this._fitPoints.forEach((fitPoint) => {
			const [x, y, z] = fitPoint;
			manager.point3d(createPoint3d(x, y, z), 1);
		});
		return manager;
	}
}
