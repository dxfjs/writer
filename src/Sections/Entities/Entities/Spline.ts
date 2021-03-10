import Entity   from "../Entity";
import Tag      from "../../../Internals/Tag";

export default class Spline extends Entity
{
    get fit_points(): number[][] {
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
    get curve_degree(): number {
        return this._curve_degree;
    }
    get control_points(): number[][] {
        return this._control_points;
    }
    private readonly _control_points: number[][];
    private readonly _curve_degree: number;
    private readonly _knots: number[];
    private readonly _weights: number[];
    private readonly _flag: number;
    private readonly _fit_points: number[][];
    public constructor(
        control_points: number[][], fit_points: number[][] = [], curve_degree: number = 3, flag: number = 8,
        knots: number[] = [], weights: number[] = []
    ) {
        super('SPLINE', 'AcDbSpline');
        this._control_points = control_points;
        this._curve_degree = curve_degree;
        this._flag = flag;
        this._knots = knots;
        this._weights = weights;
        this._fit_points = fit_points;
        const knotsLength = this.curve_degree + control_points.length - 1;
        if (this.knots.length === 0) {
            for (let i = 0; i < knotsLength; i++) {
                this.knots.push(i);
            }
        }

        if (knots.length !== knotsLength) {
            throw new Error(`Invalid knot vector length. Expected ${knotsLength} but received ${this.knots.length}.`);
        }
    }

    public tags(): Tag[] {
        let tags: Tag[] = super.tags();
        tags.push(...this.standard([
            [70, this.flag],
            [71, this.curve_degree],
            [72, this.knots.length],
            [73, this.control_points.length],
            [74, this.fit_points.length],
            [42, 0.0000001],
            [43, 0.0000001],
            [42, 0.0000000001],
        ]));
        this.knots.forEach((knot) => {
            tags.push(...this.standard([[40, knot]]));
        })
        this.control_points.forEach((point) => {
            const [x, y, z] = point;
            tags.push(...this.point(x, y, z, true));
        })
        this.fit_points.forEach((point) => {
            const [x, y, z] = point;
            tags.push(...this.point(x, y, z, true, 1));
        })
        return tags;
    }
}
