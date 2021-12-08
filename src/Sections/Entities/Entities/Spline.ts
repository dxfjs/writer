import Entity, { SplineFlags } from '../Entity';
import Tag from '../../../Internals/Tag';

export default class Spline extends Entity {
    get fitPoints(): number[][] {
        return this._fit_points;
    }
    get weights(): number[] {
        return this._weights;
    }
    get knots(): number[] {
        return this._knots;
    }
    get flag(): number {
        return this._flag;
    }
    get curveDegree(): number {
        return this._curve_degree;
    }
    get controlPoints(): number[][] {
        return this._control_points;
    }

    private readonly _control_points: number[][];
    private readonly _curve_degree: number;
    private readonly _knots: number[];
    private readonly _weights: number[];
    private readonly _flag: SplineFlags;
    private readonly _fit_points: number[][];

    public constructor(
        control_points: number[][],
        fit_points: number[][] = [],
        curve_degree: number = 3,
        flag: SplineFlags = SplineFlags.Planar,
        knots: number[] = [],
        weights: number[] = []
    ) {
        super('SPLINE', 'AcDbSpline');

        this._control_points = control_points;
        this._curve_degree = curve_degree;
        this._flag = flag;
        this._knots = knots;
        this._weights = weights;
        this._fit_points = fit_points;

        const knotsLength =
            this._curve_degree + this._control_points.length + 1;

        if (this._knots.length === 0) {
            for (let i = 0; i < this._curve_degree + 1; i++) {
                this._knots.push(0);
            }
            for (
                let i = 1;
                i < this._control_points.length - this._curve_degree;
                i++
            ) {
                this._knots.push(i);
            }
            for (let i = 0; i < this._curve_degree + 1; i++) {
                this._knots.push(
                    this._control_points.length - this._curve_degree
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

        this._control_points.forEach((control_point) => {
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

    public tags(): Tag[] {
        const tags: Tag[] = super.tags();
        tags.push(
            ...this.makeStandard([
                [70, this._flag],
                [71, this._curve_degree],
                [72, this._knots.length],
                [73, this._control_points.length],
                [74, this._fit_points.length],
                [42, 0.0000001],
                [43, 0.0000001],
                [42, 0.0000000001],
            ])
        );
        this._knots.forEach((knot) => {
            tags.push(...this.makeStandard([[40, knot]]));
        });
        this._control_points.forEach((point) => {
            const [x, y, z] = point;
            tags.push(...this.makePoint(x, y, z, true));
        });
        this._fit_points.forEach((fit_point) => {
            const [x, y, z] = fit_point;
            tags.push(...this.makePoint(x, y, z, true, 1));
        });
        return tags;
    }
}
