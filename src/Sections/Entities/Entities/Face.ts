import Point from "./Point.js";
import Entity from "../Entity.js";
import Tag from "../../../Internals/Tag.js";

export default class Face extends Entity
{
    get fourth(): Point {
        return this._fourth;
    }
    get third(): Point {
        return this._third;
    }
    get second(): Point {
        return this._second;
    }
    get first(): Point {
        return this._first;
    }
    private readonly _first: Point;
    private readonly _second: Point;
    private readonly _third: Point;
    private readonly _fourth: Point;
    public constructor(
        first: Point,
        second: Point,
        third: Point,
        fourth: Point, layer: string
    )
    {
        super('3DFACE', layer, 'AcDbFace');
        this._first = first;
        this._second = second;
        this._third = third;
        this._fourth = fourth;

    }

    public tags(): Tag[] {
        let tags: Tag[] = super.tags();
        tags.push(new Tag(10, this.first.x))
        tags.push(new Tag(20, this.first.y))
        tags.push(new Tag(30, this.first.z))
        tags.push(new Tag(11, this.second.x))
        tags.push(new Tag(21, this.second.y))
        tags.push(new Tag(31, this.second.z))
        tags.push(new Tag(12, this.third.x))
        tags.push(new Tag(22, this.third.y))
        tags.push(new Tag(32, this.third.z))
        tags.push(new Tag(13, this.fourth.x))
        tags.push(new Tag(23, this.fourth.y))
        tags.push(new Tag(33, this.fourth.z))
        return tags;
    }
}