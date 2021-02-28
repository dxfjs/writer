import Point    from "./Point.js";
import Vertex   from "./Vertex.js";
import Entity   from "../Entity.js";
import Tag      from "../../../Internals/Tag.js";

export default class Polyline extends Entity
{
    get flag(): number {
        return this._flag;
    }
    get points(): Point[] {
        return this._points;
    }
    private readonly _points: Point[];
    private readonly _flag: number;

    public constructor(points: Point[], flag: number, layer: string) {
        super('LWPOLYLINE', layer, 'AcDbPolyline');
        this._points = points;
        this._flag = flag;
    }

    public tags(): Tag[] {
        let tags: Tag[] = super.tags();
        tags.push(new Tag(90, this.points.length));
        tags.push(new Tag(70, this.flag));
        this.points.forEach((point) => {
            tags.push(new Tag(10, point.x));
            tags.push(new Tag(20, point.y));
        });
        return tags;
    }
}