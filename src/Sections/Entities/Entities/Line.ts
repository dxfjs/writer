import Point    from "./Point";
import Entity   from "../Entity";
import Tag      from "../../../Internals/Tag";

export default class Line extends Entity
{
    get start(): Point {
        return this._start;
    }
    get end(): Point {
        return this._end;
    }
    private readonly _start: Point;
    private readonly _end: Point;
    public constructor(start: Point, end: Point)
    {
        super('LINE', 'AcDbLine')
        this._start = start;
        this._end = end;
    }

    public boundingBox() {
        const xs: number[] = [];
        if (this.start.x < this.end.x) {
            xs.push(this.start.x, this.end.x);
        } else {
            xs.push(this.end.x, this.start.x);
        }
        const ys: number[] = [];
        if (this.start.y < this.end.y) {
            ys.push(this.start.y, this.end.y);
        } else {
            ys.push(this.end.y, this.start.y);
        }
        const [minX, maxX] = xs;
        const [minY, maxY] = ys;
        return [
            [minX, maxY],
            [maxX, minY]
        ];
    }

    public tags(): Tag[]
    {
        return [
            ...super.tags(),
            ...this.point(this.start.x, this.start.y,   this.start.z,   true),
            ...this.point(this.end.x,   this.end.y,     this.end.z,     true, 1)
        ];
    }
}
