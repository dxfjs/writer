import Entity from "../Entity.js";
import Tag from "../../../Internals/Tag.js";

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
        control_points: number[][], curve_degree: number, flag: number,
        knots: number[], weights: number[], fit_points: number[][]
    ) {
        super('SPLINE', 'AcDbSpline');
        this._control_points = control_points;
        this._curve_degree = curve_degree;
        this._flag = flag;
        this._knots = knots;
        this._weights = weights;
        this._fit_points = fit_points;
        if (this.knots.length === 0) {
            for (let i = 0; i < this.curve_degree + 1; i++) {
                this.knots.push(0);
            }
            for (let i = 1; i < this.control_points.length - this.curve_degree; i++) {
                this.knots.push(i);
            }
            for (let i = 0; i < this.curve_degree + 1; i++) {
                knots.push(this.control_points.length - this.curve_degree);
            }
        }
        if (knots.length !== this.control_points.length + this.curve_degree + 1) {
            throw new Error(`Invalid knot vector length. Expected ${this.control_points.length + this.curve_degree + 1} but received ${this.knots.length}.`);
        }
    }

    public tags(): Tag[] {
        let tags: Tag[] = super.tags();
        tags.push(new Tag(70, this.flag));
        tags.push(new Tag(71, this.curve_degree));
        tags.push(new Tag(72, this.knots.length));
        tags.push(new Tag(73, this.control_points.length));
        tags.push(new Tag(74, this.fit_points.length));
        tags.push(new Tag(42, 0.0000001));
        tags.push(new Tag(43, 0.0000001));
        tags.push(new Tag(44, 0.0000000001));
        this.knots.forEach((knot) => {
            tags.push(new Tag(40, knot));
        })
        this.control_points.forEach((point) => {
            tags.push(new Tag(10, point[0]))
            tags.push(new Tag(20, point[1]))
            tags.push(new Tag(30, point[2]))
        })
        this.fit_points.forEach((point) => {
            tags.push(new Tag(11, point[0]))
            tags.push(new Tag(21, point[1]))
            tags.push(new Tag(31, point[2]))
        })
        return tags;
    }
}
