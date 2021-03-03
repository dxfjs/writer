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
        let tags: Tag[] =  super.tags();
        tags.push(new Tag(10, this.center.x));
        tags.push(new Tag(20, this.center.y));
        tags.push(new Tag(30, this.center.z));
        tags.push(new Tag(11, this.x_major_axis));
        tags.push(new Tag(21, this.y_major_axis));
        tags.push(new Tag(31, 0));
        tags.push(new Tag(40, this.ratio_minor_axis));
        tags.push(new Tag(41, this.start_parameter));
        tags.push(new Tag(42, this.end_parameter));
        return tags;
    }
}
