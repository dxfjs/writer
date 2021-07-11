import Entity   from    "../Entity";
import Tag      from    "../../../Internals/Tag";

export default class Point extends Entity
{
    get x_center(): number { return this._x_center;   }
    get y_center(): number { return this._y_center;   }
    get z_center(): number { return this._z_center;   }

    private readonly _x_center: number;
    private readonly _y_center: number;
    private readonly _z_center: number;

    public constructor(x_center : number, y_center : number, z_center : number = 0)
    {
        super('POINT', 'AcDbPoint');
        this._x_center = x_center;
        this._y_center = y_center;
        this._z_center = z_center;
    }

    public boundingBox()
    {
        return [
            [this.x_center, this.y_center],
            [this.x_center, this.y_center],
        ];
    }

    public tags() : Tag[]
    {
        return [
            ...super.tags(),
            ...this.makePoint(this.x_center, this.y_center,   this.z_center,   true)
        ];
    }
}
