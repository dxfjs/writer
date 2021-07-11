import Point    from    "./Point";
import Entity   from    "../Entity";
import Tag      from    "../../../Internals/Tag";

export default class Face extends Entity
{
    get fourth  () : Point { return this._fourth;   }
    get third   () : Point { return this._third;    }
    get second  () : Point { return this._second;   }
    get first   () : Point { return this._first;    }

    private readonly _first     : Point;
    private readonly _second    : Point;
    private readonly _third     : Point;
    private readonly _fourth    : Point;

    public constructor(
        first: Point, second: Point,
        third: Point, fourth: Point
    ) {
        super('3DFACE', 'AcDbFace');
        this._first     = first;
        this._second    = second;
        this._third     = third;
        this._fourth    = fourth;

    }
    public boundingBox() {
        const arrayX = [this.first.x_center, this.second.x_center, this.third.x_center, this.fourth.x_center];
        const arrayY = [this.first.y_center, this.second.y_center, this.third.y_center, this.fourth.y_center];
        const minX = Math.min(...arrayX);
        const maxX = Math.max(...arrayX);
        const minY = Math.min(...arrayY);
        const maxY = Math.max(...arrayY);
        return [
            [minX, maxY],
            [maxX, minY]
        ];
    }

    public tags(): Tag[] {
        return [
            ...super.tags(),
            ...this.makePoint(this.first.x_center  , this.first.y_center  , this.first.z_center  , true),
            ...this.makePoint(this.second.x_center , this.second.y_center , this.second.z_center , true, 1),
            ...this.makePoint(this.third.x_center  , this.third.y_center  , this.third.z_center  , true, 2),
            ...this.makePoint(this.fourth.x_center , this.fourth.y_center , this.fourth.z_center , true, 3),
        ];
    }
}
