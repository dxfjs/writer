import Point from "./Point.js";
import Entity from "../Entity.js";
import Tag from "../../../Internals/Tag.js";

export default class Arc extends Entity
{
    get endAngle(): number {
        return this._endAngle;
    }
    get startAngle(): number {
        return this._startAngle;
    }
    get radius(): number {
        return this._radius;
    }
    get center(): Point {
        return this._center;
    }
    private readonly _center: Point;
    private readonly _radius: number;
    private readonly _startAngle: number;
    private readonly _endAngle: number;
    public constructor(center: Point, radius: number, startAngle: number, endAngle: number, layer: string) {
        super('ARC', layer, 'AcDbCircle')
        this._center = center;
        this._radius = radius;
        this._startAngle = startAngle;
        this._endAngle = endAngle;
    }

    public tags(): Tag[] {
        let tags: Tag[] = super.tags();
        tags.push(new Tag(10, this.center.x));
        tags.push(new Tag(20, this.center.y));
        tags.push(new Tag(30, this.center.z));
        tags.push(new Tag(40, this.radius));
        tags.push(new Tag(100, 'AcDbArc'));
        tags.push(new Tag(50, this.startAngle));
        tags.push(new Tag(51, this.endAngle));
        return tags;
    }
}
