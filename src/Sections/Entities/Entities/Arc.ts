import Point    from "./Point";
import Entity   from "../Entity";
import Tag      from "../../../Internals/Tag";

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
    public constructor(center: Point, radius: number, startAngle: number, endAngle: number) {
        super('ARC', 'AcDbCircle')
        this._center = center;
        this._radius = radius;
        this._startAngle = startAngle;
        this._endAngle = endAngle;
    }

    public boundingBox(): number[][] {
        return [
            [this.center.x - this.radius, this.center.y + this.radius],
            [this.center.x + this.radius, this.center.y - this.radius]
        ];
    }

    public tags(): Tag[] {
        return [
            ...super.tags(),
            ...this.point(this.center.x, this.center.y, this.center.z, true),
            ...this.standard([[40, this.radius]]),
            ...this.subclassMarker('AcDbArc'),
            ...this.standard([[50, this.startAngle], [51, this.endAngle]])
        ];
    }
}
