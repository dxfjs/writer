import Entity   from "../Entity";
import Tag      from "../../../Internals/Tag";

export default class Spline extends Entity
{
    get fitPoints(): number[][] {
        return this._fitPoints;
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
        return this._curveDegree;
    }
    get controlPoints(): number[][] {
        return this._controlPoints;
    }
    private readonly _controlPoints: number[][];
    private readonly _curveDegree: number;
    private readonly _knots: number[];
    private readonly _weights: number[];
    private readonly _flag: number;
    private readonly _fitPoints: number[][];
    public constructor(
        controlPoints: number[][], fitPoints: number[][] = [], curveDegree: number = 3, flag: number = 8,
        knots: number[] = [], weights: number[] = []
    ) {
        super('SPLINE', 'AcDbSpline');
        this._controlPoints = controlPoints;
        this._curveDegree = curveDegree;
        this._flag = flag;
        this._knots = knots;
        this._weights = weights;
        this._fitPoints = fitPoints;
        const knotsLength = this.curveDegree + controlPoints.length - 1;
        if (this.knots.length === 0) {
            for (let i = 0; i < knotsLength; i++) {
                this.knots.push(i);
            }
        }

        if (knots.length !== knotsLength) {
            throw new Error(`Invalid knot vector length. Expected ${knotsLength} but received ${this.knots.length}.`);
        }
    }

    public boundingBox() {
        const arrayX: number[] = [];
        const arrayY: number[] = [];
        this.controlPoints.forEach((point) => {
            const [x, y] = point;
            arrayX.push(x);
            arrayY.push(y);
        });
        const minX = Math.min(...arrayX);
        const maxX = Math.max(...arrayX);
        const minY = Math.min(...arrayY);
        const maxY = Math.max(...arrayY);
        return [
            [minX, maxY],
            [maxX, minY]
        ];
    }

    public tags(): Tag[] {
        let tags: Tag[] = super.tags();
        tags.push(...this.makeStandard([
            [70, this.flag],
            [71, this.curveDegree],
            [72, this.knots.length],
            [73, this.controlPoints.length],
            [74, this.fitPoints.length],
            [42, 0.0000001],
            [43, 0.0000001],
            [42, 0.0000000001],
        ]));
        this.knots.forEach((knot) => {
            tags.push(...this.makeStandard([[40, knot]]));
        })
        this.controlPoints.forEach((point) => {
            const [x, y, z] = point;
            tags.push(...this.makePoint(x, y, z, true));
        })
        this.fitPoints.forEach((point) => {
            const [x, y, z] = point;
            tags.push(...this.makePoint(x, y, z, true, 1));
        })
        return tags;
    }
}
