import Point    from    "./Point";
import Entity   from    "../Entity";
import Tag      from    "../../../Internals/Tag";

export default class Line extends Entity {
    
    get start() : Point { return this._start;   }
    get end()   : Point { return this._end;     }

    private readonly _start     : Point;
    private readonly _end       : Point;

    public constructor(start: Point, end: Point)
    {
        super('LINE', 'AcDbLine')
        this._start = start;
        this._end   = end;
    }

    public boundingBox() {
        const xs: number[] = [];
        if (this.start.x_center < this.end.x_center) {
            xs.push(this.start.x_center, this.end.x_center);
        } else {
            xs.push(this.end.x_center, this.start.x_center);
        }
        const ys: number[] = [];
        if (this.start.y_center < this.end.y_center) {
            ys.push(this.start.y_center, this.end.y_center);
        } else {
            ys.push(this.end.y_center, this.start.y_center);
        }
        const [minX, maxX] = xs;
        const [minY, maxY] = ys;
        return [
            [minX, maxY],
            [maxX, minY]
        ];
    }

    public tags(): Tag[]
    {
        return [
            ...super.tags(),
            ...this.makePoint(this.start.x_center, this.start.y_center,   this.start.z_center,   true),
            ...this.makePoint(this.end.x_center,   this.end.y_center,     this.end.z_center,     true, 1)
        ];
    }
}
