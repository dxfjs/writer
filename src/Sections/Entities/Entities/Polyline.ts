import Entity   from "../Entity.js";
import Tag      from "../../../Internals/Tag.js";

export default class Polyline extends Entity
{
    get flag(): number {
        return this._flag;
    }
    get points(): number[][] {
        return this._points;
    }
    private readonly _points: number[][];
    private readonly _flag: number;

    public constructor(points: number[][], flag: number, layer: string) {
        super('LWPOLYLINE', layer, 'AcDbPolyline');
        this._points = points;
        this._flag = flag;
    }

    public tags(): Tag[] {
        let tags: Tag[] = super.tags();
        tags.push(new Tag(90, this.points.length));
        tags.push(new Tag(70, this.flag));
        this.points.forEach((point) => {
            tags.push(new Tag(10, point[0]));
            tags.push(new Tag(20, point[1]));
        });
        return tags;
    }
}