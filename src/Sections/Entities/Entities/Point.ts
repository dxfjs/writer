import Entity   from "../Entity";
import Tag      from "../../../Internals/Tag";

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
        return [
            ...super.tags(),
            ...this.point(this.x, this.y,   this.z,   true)
        ];
    }
}
