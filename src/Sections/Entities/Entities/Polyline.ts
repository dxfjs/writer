import Vertex   from "./Vertex";
import Entity   from "../Entity";
import Tag      from "../../../Internals/Tag";

export default class Polyline extends Entity
{
    get vertexes(): Vertex[] {
        return this._vertexes;
    }
    get flag(): number {
        return this._flag;
    }
    get points(): number[][] {
        return this._points;
    }
    private readonly _points: number[][];
    private readonly _flag: number;
    private _vertexes: Vertex[] = [];

    public constructor(points: number[][], flag: number) {
        super('LWPOLYLINE', 'AcDbPolyline');
        this._points = points;
        this._flag = flag;
        this.points.forEach((point) => {
            this._vertexes.push(new Vertex(point, 32));
        });
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
            [maxX, minY]
        ];
    }

    public tags(): Tag[] {
        let tags: Tag[] = super.tags();
        if (this.isSupported(Entity.versions.R13)) {
            tags.push(...this.standard([[90, this.points.length]]));
            tags.push(...this.standard([[70, this.flag]]));
            this.points.forEach((point) => {
                const [x, y] = point;
                tags.push(...this.point(x, y));
            });
        } else {
            tags.push(...this.standard([[70, this.flag]]));
            this._vertexes.forEach((vertex) => {
                tags.push(...vertex.tags());
            });
        }

        return tags;
    }
}
