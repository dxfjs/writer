import Entity from '../Entity';
import Tag from '../../../Internals/Tag';


// https://documentation.help/AutoCAD-DXF/WS1a9193826455f5ff18cb41610ec0a2e719-79f0.htm
export interface PolylineOptions {
    startWidth?: number
    endWidth?: number
}

export default class Polyline extends Entity {
    get flag(): number {
        return this._flag;
    }
    get points(): number[][] {
        return this._points;
    }

    private readonly _points: number[][];
    private readonly _flag: number;
    private readonly _options: PolylineOptions;

    public constructor(points: number[][], flag: number, options: PolylineOptions) {
        super('LWPOLYLINE', 'AcDbPolyline');
        this._points = points;
        this._flag = flag;
        this._options = options
    }

    public boundingBox() {
        const arrayX: number[] = [];
        const arrayY: number[] = [];
        this.points.forEach((point) => {
            const [x, y] = point;
            arrayX.push(x);
            arrayY.push(y);
        });
        const minX = Math.min(...arrayX);
        const maxX = Math.max(...arrayX);
        const minY = Math.min(...arrayY);
        const maxY = Math.max(...arrayY);
        return [
            [minX, maxY],
            [maxX, minY],
        ];
    }

    public tags(): Tag[] {
        let tags: Tag[] = super.tags();
        tags.push(...this.makeStandard([[90, this.points.length]]));
        tags.push(...this.makeStandard([[70, this.flag]]));
        if (this._options.startWidth) {
            tags.push(...this.makeStandard([[40, this._options.startWidth]]));
        }
        if (this._options.endWidth) {
            tags.push(...this.makeStandard([[41, this._options.endWidth]]));
        }

        this.points.forEach((point) => {
            const [x, y] = point;
            tags.push(...this.makePoint(x, y));
        });
        return tags;
    }
}
