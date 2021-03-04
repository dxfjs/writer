import Entity from "../Entity.js";
import Tag from "../../../Internals/Tag.js";

export default class Vertex extends Entity
{
    get vertex_flag(): number {
        return this._vertex_flag;
    }
    get vertexPoint(): number[] {
        return this._vertexPoint;
    }
    private readonly _vertexPoint: number[];
    private readonly _vertex_flag: number;

    public constructor(point: number[], vertex_flag: number) {
        super('VERTEX', 'AcDbVertex');
        this._vertexPoint = point;
        this._vertex_flag = vertex_flag;
    }

    public tags(): Tag[] {
        let tags: Tag[] = super.tags();
        tags.push(new Tag(100, 'AcDb3dPolylineVertex')) // TODO make this dynamic
        tags.push(new Tag(10, this.vertexPoint[0]))
        tags.push(new Tag(20, this.vertexPoint[1]))
        tags.push(new Tag(30, this.vertexPoint[2]))
        tags.push(new Tag(70, this.vertex_flag))
        return tags;
    }
}
