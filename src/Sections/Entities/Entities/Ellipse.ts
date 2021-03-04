import Point from "./Point.js";
import Entity from "../Entity.js";
import Tag from "../../../Internals/Tag.js";

export default class Ellipse extends Entity
{
    get end_parameter(): number {
        return this._end_parameter;
    }
    get start_parameter(): number {
        return this._start_parameter;
    }
    get ratio_minor_axis(): number {
        return this._ratio_minor_axis;
    }
    get y_major_axis(): number {
        return this._y_major_axis;
    }
    get x_major_axis(): number {
        return this._x_major_axis;
    }
    get center(): Point {
        return this._center;
    }
    private readonly _center: Point;
    private readonly _x_major_axis: number;
    private readonly _y_major_axis: number;
    private readonly _ratio_minor_axis: number;
    private readonly _start_parameter: number;
    private readonly _end_parameter: number;
    public constructor(
        center: Point, x_major_axis: number, y_major_axis: number,
        ratio_minor_axis: number, start_parameter: number, end_parameter: number, layer: string)
    {
        super('ELLIPSE', layer, 'AcDbEllipse');
        this._center = center;
        this._x_major_axis = x_major_axis;
        this._y_major_axis = y_major_axis;
        this._ratio_minor_axis = ratio_minor_axis;
        this._start_parameter = start_parameter;
        this._end_parameter = end_parameter;
    }

    public tags(): Tag[]
    {
        return [
            ...super.tags(),
            ...this.point(this.center.x, this.center.y, this.center.z, true).tags(),
            ...this.point(this.x_major_axis, this.y_major_axis, 0, true, 1).tags(),
            ...this.standard([[40, this.ratio_minor_axis], [41, this.start_parameter], [42, this.end_parameter]]).tags()
        ];
    }
}
