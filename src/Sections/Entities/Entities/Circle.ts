import Entity from "../Entity.js";
import Point from "./Point.js";
import Tag from "../../../Internals/Tag.js";

export default class Circle extends Entity
{
    get radius(): number {
        return this._radius;
    }
    get center(): Point {
        return this._center;
    }
    private readonly _center: Point;
    private readonly _radius: number;
    public constructor(center: Point, radius: number, layer: string) {
        super('CIRCLE', layer, 'AcDbCircle');
        this._center = center;
        this._radius = radius;
    }

    public tags(): Tag[] {
        let tags: Tag[] = super.tags();
        tags.push(...this.point(this.center.x, this.center.y, this.center.z, true).tags());
        tags.push(...this.standard([[40, this.radius]]).tags());
        return tags;
    }
}
