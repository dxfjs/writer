import Point    from "./Point";
import Entity   from "../Entity";
import Tag      from "../../../Internals/Tag";

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
        first: Point, second: Point,
        third: Point, fourth: Point
    ) {
        super('3DFACE', 'AcDbFace');
        this._first = first;
        this._second = second;
        this._third = third;
        this._fourth = fourth;

    }

    public tags(): Tag[] {
        return [
            ...super.tags(),
            ...this.point(this.first.x, this.first.y, this.first.z, true),
            ...this.point(this.second.x, this.second.y, this.second.z, true, 1),
            ...this.point(this.third.x, this.third.y, this.third.z, true, 2),
            ...this.point(this.fourth.x, this.fourth.y, this.fourth.z, true, 3),
        ];
    }
}
