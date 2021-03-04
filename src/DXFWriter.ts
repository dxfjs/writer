import DXFManager   from "./Internals/DXFManager.js";
import Header       from "./Sections/Header/Header.js";
import Tables       from "./Sections/Tables/Tables.js";
import Blocks       from "./Sections/Blocks/Blocks.js";
import Classes      from "./Sections/Classes/Classes.js";
import Objects      from "./Sections/Objects/Objects.js";
import Entities     from "./Sections/Entities/Entities.js";

export default class DXFWriter extends DXFManager {
    private _header:    Header;
    private _classes:   Classes;
    private _tables:    Tables;
    private _blocks:    Blocks;
    private _entities:  Entities;
    private _objects:   Objects;

    public constructor(version: string = DXFManager.versions.R2007) {
        super(version);
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

    public setCurrentLayer(layerName: string): DXFWriter
    {
        if (this._tables.layers.find((layer) => layer.layerName === layerName)) {
            DXFManager.currentLayer = layerName;
        }
        return this;
    }

    public setUnit(unit: number): DXFWriter {
        this._header.unit = unit;
        return this;
    }

    public addLine(
        x_start: number, y_start: number,
        x_end: number, y_end: number
    ): DXFWriter {
        this._entities.addLine(x_start, y_start, x_end, y_end);
        return this;
    }

    public addPolyline(points: number[][], flag: number): DXFWriter {
        this._entities.addPolyline(points, flag);
        return this;
    }

    public addRectangle (
        top_left_x: number, top_left_y: number,
        bottom_right_x: number, bottom_right_y: number
    ): DXFWriter {
        const corners = [
            [top_left_x, top_left_y],
            [bottom_right_x, top_left_y],
            [bottom_right_x, bottom_right_y],
            [top_left_x, bottom_right_y]
        ];
        this._entities.addPolyline(corners, 1);
        return this;
    }

    public addPolyline3D(points: number[][], flag: number): DXFWriter {
        this._entities.addPolyline3D(points, flag);
        return this;
    }

    public addPoint(x: number, y: number, z: number): DXFWriter {
        this._entities.addPoint(x, y, z);
        return this;
    }

    public addCircle(x_center: number, y_center: number, radius: number): DXFWriter {
        this._entities.addCircle(x_center, y_center, radius);
        return this;
    }

    public addArc(
        x: number, y: number, radius: number,
        startAngle: number, endAngle: number
    ): DXFWriter {
        this._entities.addArc(x, y, radius, startAngle, endAngle);
        return this;
    }

    public addSpline(
        controlPoints: number[][], curveDegree: number,
        flag: number, knots: number[],
        weights: number[], fitPoints: number[][]
    ): DXFWriter {
        this._entities.addSpline(controlPoints, curveDegree, flag, knots, weights, fitPoints);
        return this;
    }

    public addEllipse(
        x_center: number, y_center: number, x_major_axis: number, y_major_axis: number,
        ratio_minor_axis: number, start_parameter: number, end_parameter: number
    ): DXFWriter {
        this._entities.addEllipse(
            x_center, y_center, x_major_axis, y_major_axis, ratio_minor_axis,
            start_parameter, end_parameter
        );
        return this;
    }

    public add3DFace(
        x_first: number, y_first: number, z_first: number,
        x_second: number, y_second: number, z_second: number,
        x_third: number, y_third: number, z_third: number,
        x_fourth: number, y_fourth: number, z_fourth: number
    ): DXFWriter {
        this._entities.add3DFace(x_first, y_first, z_first,
            x_second, y_second, z_second,
            x_third, y_third, z_third,
            x_fourth, y_fourth, z_fourth
        );
        return this;
    }

    public addText(
        x: number, y: number,
        height: number, value: string,
    ): DXFWriter {
        this._entities.addText(
            x, y, height, value
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
        str += this.entityType('EOF').stringify();

        this._header.handSeed = this.handleSeed();
        str = `${this._header.stringify()}${str}`;
        return str;
    }
}