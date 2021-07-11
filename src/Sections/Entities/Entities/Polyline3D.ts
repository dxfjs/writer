import Entity   from    "../Entity";
import Vertex   from    "./Vertex";
import Tag      from    "../../../Internals/Tag";

export default class Polyline3D extends Entity
{
    get flag()  : number        { return this._flag;    }
    get points(): number[][]    { return this._points;  }

    private readonly _points    : number[][];
    private readonly _flag      : number;
    private _vertexes           : Vertex[] = [];
    private readonly _seqHandle : string;

    public constructor(points: number[][], flag: number) {
        super('POLYLINE', 'AcDb3dPolyline');
        
        this._points    = points;
        this._flag      = flag;

        this.points.forEach((point) => {
            this._vertexes.push(new Vertex(point, 32));
        });
        this._seqHandle = this.handleSeed();
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
        tags.push(...this.makeStandard([[66, 1]]));
        tags.push(...this.makePoint(0, 0, 0, true));
        tags.push(...this.makeStandard([[70, this.flag]]));
        this._vertexes.forEach((vertex) => {
            tags.push(...vertex.tags());
        });
        tags.push(...this.makeEntityType('SEQEND'));
        tags.push(...this.makeHandle(this._seqHandle));
        tags.push(...this.makeSubclassMarker('AcDbEntity'));
        tags.push(...this.makeLayer(Entity.currentLayer));
        return tags;
    }
}
