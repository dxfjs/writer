import Entity   from "../Entity";
import Tag      from "../../../Internals/Tag";

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

    public constructor(points: number[][], flag: number) {
        super('LWPOLYLINE', 'AcDbPolyline');
        this._points = points;
        this._flag = flag;
    }

    public tags(): Tag[] {
        let tags: Tag[] = super.tags();
        tags.push(...this.standard([[90, this.points.length]]));
        tags.push(...this.standard([[70, this.flag]]));
        this.points.forEach((point) => {
            const [x, y] = point;
            tags.push(...this.point(x, y));
        });
        return tags;
    }
}
