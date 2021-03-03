import Entity from "../Entity.js";
import Tag from "../../../Internals/Tag.js";

export default class Vertex extends Entity
{
    get vertex_flag(): number {
        return this._vertex_flag;
    }
    get point(): number[] {
        return this._point;
    }
    private readonly _point: number[];
    private readonly _vertex_flag: number;

    public constructor(point: number[], vertex_flag: number, layer: string )
    {
        super('VERTEX', layer, 'AcDbVertex');
        this._point = point;
        this._vertex_flag = vertex_flag;
    }

    public tags(): Tag[] {
        let tags: Tag[] = super.tags();
        tags.push(new Tag(100, 'AcDb3dPolylineVertex')) // TODO make this dynamic
        tags.push(new Tag(10, this.point[0]))
        tags.push(new Tag(20, this.point[1]))
        tags.push(new Tag(30, this.point[2]))
        tags.push(new Tag(70, this.vertex_flag))
        return tags;
    }
}
