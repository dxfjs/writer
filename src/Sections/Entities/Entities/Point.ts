import Entity from "../Entity.js";
import Tag from "../../../Internals/Tag.js";

export default class Point extends Entity
{
    get x(): number {
        return this._x;
    }
    get y(): number {
        return this._y;
    }
    get z(): number {
        return this._z;
    }

    private readonly _x: number;
    private readonly _y: number;
    private readonly _z: number;

    public constructor(x: number, y: number, z: number) {
        super('POINT', 'AcDbPoint');
        this._x = x;
        this._y = y;
        this._z = z;
    }
    public tags(): Tag[] {
        let tags: Tag[] = super.tags();
        tags.push(new Tag(10, this.x))
        tags.push(new Tag(20, this.y))
        tags.push(new Tag(30, this.z))
        return tags;
    }
}
