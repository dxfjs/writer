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
    public tags(): Tag[]
    {
        return [
            ...super.tags(),
            ...this.point(this.start.x, this.start.y,   this.start.z,   true),
            ...this.point(this.end.x,   this.end.y,     this.end.z,     true, 1)
        ];
    }
}
