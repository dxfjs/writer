import Tag          from "./Internals/Tag.js";
import Standard     from "./Internals/Standard.js";
import Point        from "./Sections/Entities/Entities/Point.js";

import Header       from "./Sections/Header/Header.js";
import Tables       from "./Sections/Tables/Tables.js";
import Blocks       from "./Sections/Blocks/Blocks.js";
import Classes      from "./Sections/Classes/Classes.js";
import Objects      from "./Sections/Objects/Objects.js";
import Entities     from "./Sections/Entities/Entities.js";

export default class DXFWriter extends Standard {

    get currentLayer(): string {
        return this._currentLayer;
    }

    private _currentLayer: string = '0'

    private _header:    Header;
    private _classes:   Classes;
    private _tables:    Tables;
    private _blocks:    Blocks;
    private _entities:  Entities;
    private _objects:   Objects;

    public constructor(version: string) {
        super();
        this._header    = new Header(version);
        this._classes   = new Classes();
        this._tables    = new Tables();
        this._blocks    = new Blocks();
        this._entities  = new Entities();
        this._objects   = new Objects();
    }

    public addVariable(name: string, group_code: number, value: number | string): DXFWriter {
        this._header.addVariable(name, group_code, value);
        return this;
    }

    public addLineType(name: string, descriptive: string, elements: number []): DXFWriter {
        this._tables.addLineType(name, descriptive, elements);
        return this;
    }

    public addLayer(name: string, color: number, ltype: string, flag: number): DXFWriter {
        this._tables.addLayer(name, color, ltype, flag);
        return this;
    }

    public setCurrentLayer(name: string)
    {
        this._currentLayer = name;
    }

    public addLine(x_start: number, y_start: number,
                   x_end: number, y_end: number)
    {
        this._entities.addLine(x_start, y_start, x_end, y_end, this.currentLayer);
        return this;
    }

    public addPolyline(points: Point[], flag: number)
    {
        this._entities.addPolyline(points, flag, this.currentLayer);
        return this;
    }

    public addRectangle(top_left: Point, bottom_right: Point)
    {
        const corners = [
            new Point(top_left.x, top_left.y, 0, this.currentLayer),
            new Point(bottom_right.x, top_left.y, 0, this.currentLayer),
            new Point(bottom_right.x, bottom_right.y, 0, this.currentLayer),
            new Point(top_left.x, bottom_right.y, 0, this.currentLayer)
        ];
        this._entities.addPolyline(corners, 1, this.currentLayer);
        return this;
    }

    public addPolyline3D(points: Point[], flag: number)
    {
        this._entities.addPolyline3D(points, flag, this.currentLayer);
        return this;
    }

    public addPoint(x: number, y: number, z: number)
    {
        this._entities.addPoint(x, y, z, this.currentLayer);
        return this;
    }

    public addCircle(x_center: number, y_center: number, radius: number)
    {
        this._entities.addCircle(x_center, y_center, radius, this.currentLayer);
        return this;
    }

    public addArc(x: number, y: number, radius: number,
                  startAngle: number, endAngle: number)
    {
        this._entities.addArc(x, y, radius, startAngle, endAngle, this.currentLayer);
        return this;
    }

    public addSpline(controlPoints: Point[], curveDegree: number,
                     flag: number, knots: number[],
                     weights: number[], fitPoints: Point[])
    {
        this._entities.addSpline(controlPoints, curveDegree, flag, knots, weights, fitPoints, this.currentLayer);
        return this;
    }

    public addEllipse(x_center: number, y_center: number, x_major_axis: number, y_major_axis: number,
                      ratio_minor_axis: number, start_parameter: number, end_parameter: number)
    {
        this._entities.addEllipse(
            x_center, y_center, x_major_axis, y_major_axis, ratio_minor_axis,
            start_parameter, end_parameter, this.currentLayer
        );
        return this;
    }

    public add3DFace(
        x_first: number, y_first: number, z_first: number,
        x_second: number, y_second: number, z_second: number,
        x_third: number, y_third: number, z_third: number,
        x_fourth: number, y_fourth: number, z_fourth: number
    )
    {
        this._entities.add3DFace(x_first, y_first, z_first,
            x_second, y_second, z_second,
            x_third, y_third, z_third,
            x_fourth, y_fourth, z_fourth,
            this.currentLayer
        );
        return this;
    }

    public addText(
        x: number, y: number,
        height: number, value: string,
    )
    {
        this._entities.addText(
            x, y, height, value, this.currentLayer
        );
        return this;
    }

    public stringify(): string {
        let str: string = '';
        str += this._classes.stringify();
        str += this._tables.stringify();
        this._blocks.modelHandle = this._tables.blockRecords.modelHandle;
        this._blocks.paperHandle = this._tables.blockRecords.paperHandle;
        str += this._blocks.stringify();
        str += this._entities.stringify();
        str += this._objects.stringify();
        str += new Tag(0, 'EOF').stringify();

        this._header.handSeed = this.handle();
        str = `${this._header.stringify()}${str}`;
        return str;
    }
}