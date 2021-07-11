import Point    from    "./Point";
import Entity   from    "../Entity";
import Tag      from    "../../../Internals/Tag";

export default class Circle extends Entity
{
    get radius(): number { return this._radius; }
    get center(): Point  { return this._center; }

    private readonly _center: Point;
    private readonly _radius: number;

    public constructor(center: Point, radius: number) {
        super('CIRCLE', 'AcDbCircle');
        this._center = center;
        this._radius = radius;
    }

    public boundingBox() {
        return [
            [this.center.x - this.radius, this.center.y + this.radius],
            [this.center.x + this.radius, this.center.y - this.radius]
        ];
    }

    public tags(): Tag[] {
        let tags: Tag[] = super.tags();
        tags.push(...this.makePoint(this.center.x, this.center.y, this.center.z, true));
        tags.push(...this.makeStandard([[40, this.radius]]));
        return tags;
    }
}
