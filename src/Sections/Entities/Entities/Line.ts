import Point from "./Point.js";
import Entity from "../Entity.js";
import Tag from "../../../Internals/Tag.js";

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
    public constructor(start: Point, end: Point, layer: string)
    {
        super('LINE', layer, 'AcDbLine')
        this._start = start;
        this._end = end;
    }
    public tags(): Tag[]
    {
        let tags: Tag[] = super.tags();
        tags.push(new Tag(10, this.start.x));
        tags.push(new Tag(20, this.start.y));
        tags.push(new Tag(30, this.start.z));
        tags.push(new Tag(11, this.end.x));
        tags.push(new Tag(21, this.end.y));
        tags.push(new Tag(31, this.end.z));
        return tags;
    }
}