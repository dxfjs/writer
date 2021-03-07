import Entity from "../Entity";
import Tag from "../../../Internals/Tag";

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
        const [x, y, z] = this.vertexPoint;
        return [
            ...super.tags(),
            ...this.subclassMarker('AcDb3dPolylineVertex'), // TODO make this dynamic
            ...this.point(x, y, z, true),
            ...this.standard([[70, this.vertex_flag]])
        ];
    }
}
