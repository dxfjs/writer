import DXFManager   from "./Internals/DXFManager";
import Header       from "./Sections/Header/Header";
import Tables       from "./Sections/Tables/Tables";
import Blocks       from "./Sections/Blocks/Blocks";
import Classes      from "./Sections/Classes/Classes";
import Objects      from "./Sections/Objects/Objects";
import Entities     from "./Sections/Entities/Entities";

export default class DXFWriter extends DXFManager {
    private header:    Header;
    private classes:   Classes;
    private tables:    Tables;
    private blocks:    Blocks;
    private entities:  Entities;
    private objects:   Objects;

    /**
     * The base class for creating the dxf content.
     * @param version{string}   Not working at this moment :(. Do bot bother using it. Use DXFWriter.versions to set the version.
     */
    public constructor(version: string = DXFManager.versions.R2007) {
        super();
        this.setVersion(version);
        this.header             = new Header();
        this.classes            = new Classes();
        this.blocks             = new Blocks();
        this.tables             = this.blocks.tables;
        this.entities           = this.header.entities;
        this.objects            = new Objects();
        this.tables.entities    = this.header.entities;
    }

    /**
     * Add a variable to the Header section of the dxf
     * @param variableName
     * @param values
     */
    public addVariable(variableName: string, values: [number, (number | string)][]): DXFWriter {
        this.header.addVariable(variableName, values);
        return this;
    }

    /**
     * Add a new LineType o the dxf.
     * @param name name of linetype.
     * @param descriptive the descriptive of the line ex: __ __ . __ __ .
     * @param elements an array of the pattern. NB: need more explications :(
     */
    public addLineType(name: string, descriptive: string, elements: number []): DXFWriter {
        this.tables.addLineType(name, descriptive, elements);
        return this;
    }

    /**
     * Add a new Layer to the dxf.
     * @param name{string} the name of the layer.
     * @param color{number} the color index.
     * @param ltype{string} the linetype name.
     * @param flag{number} the flag of the layer (0: is thawed, 1: is frozen).
     */
    public addLayer(name: string, color: number, ltype: string, flag: number = 0): DXFWriter {
        this.tables.addLayer(name, color, ltype, flag);
        return this;
    }

    /**
     * Set the current Layer.
     * @param layerName{string} the layer name.
     */
    public setCurrentLayer(layerName: string): DXFWriter
    {
        if (this.tables.layers.find((layer) => layer.layerName === layerName)) {
            DXFManager.currentLayer = layerName;
        }
        return this;
    }

    /**
     * Set the unit of the dxf.
     * @param unit{number} use DXFWriter.units to set the unit.
     */
    public setUnit(unit: number): DXFWriter {
        this.header.unit = unit;
        return this;
    }

    /**
     * Set the version of the dxf file
     * Not working at this moment :(. Do bot bother using it.
     * @param version{string} use DXFWriter.versions to set the version.
     */
    public setVersion(version: string): DXFWriter {
        DXFManager.version = version;
        return this;
    }

    /**
     * Add an entity Line to the dxf
     * @param x_start
     * @param y_start
     * @param x_end
     * @param y_end
     */
    public addLine(
        x_start: number, y_start: number,
        x_end: number, y_end: number
    ): DXFWriter {
        this.entities.addLine(x_start, y_start, x_end, y_end);
        return this;
    }

    /**
     * Add an entity Polyline to the dxf
     * @param points an array of points like: [[x1, y1], [x2, y2], ...]
     * @param flag
     */
    public addPolyline(points: number[][], flag: number): DXFWriter {
        this.entities.addPolyline(points, flag);
        return this;
    }

    /**
     * Add an entity Polyline (Closed) as Rectangle to the dxf.
     * @param top_left_x
     * @param top_left_y
     * @param bottom_right_x
     * @param bottom_right_y
     */
    public addRectangle (
        top_left_x: number, top_left_y: number,
        bottom_right_x: number, bottom_right_y: number
    ): DXFWriter {
        const corners = [
            [top_left_x,        top_left_y],
            [bottom_right_x,    top_left_y],
            [bottom_right_x,    bottom_right_y],
            [top_left_x,        bottom_right_y]
        ];
        this.entities.addPolyline(corners, 1);
        return this;
    }

    /**
     * Add an entity Polyline 3D to the dxf.
     * @param points an array of points like: [[x1, y1, z1], [x2, y2, z2], ...]
     * @param flag
     */
    public addPolyline3D(points: number[][], flag: number): DXFWriter {
        this.entities.addPolyline3D(points, flag);
        return this;
    }

    /**
     * Add an entity Point to the dxf.
     * @param x
     * @param y
     * @param z
     */
    public addPoint(x: number, y: number, z: number): DXFWriter {
        this.entities.addPoint(x, y, z);
        return this;
    }

    /**
     * Add an entity Circle to the dxf.
     * @param x_center
     * @param y_center
     * @param radius
     */
    public addCircle(x_center: number, y_center: number, radius: number): DXFWriter {
        this.entities.addCircle(x_center, y_center, radius);
        return this;
    }

    /**
     * Add an entity Arc to the dxf.
     * @param x{number}
     * @param y{number}
     * @param radius{number}
     * @param startAngle{number}
     * @param endAngle{number}
     */
    public addArc(
        x: number, y: number, radius: number,
        startAngle: number, endAngle: number
    ): DXFWriter {
        this.entities.addArc(x, y, radius, startAngle, endAngle);
        return this;
    }

    /**
     * Add an entity Spline to the dxf. It's a NURBS.
     * @param controlPoints{[number, number][]} the control points of the spline.
     * @param fitPoints{[number, number][]} the fit points for the spline.
     * @param curveDegree{number} the curve degree of the spline, mostly 3.
     * @param flag
     * @param knots
     * @param weights
     */
    public addSpline(
        controlPoints: number[][], fitPoints: number[][], curveDegree: number,
        flag: number, knots: number[],
        weights: number[]
    ): DXFWriter {
        this.entities.addSpline(controlPoints, fitPoints, curveDegree, flag, knots, weights);
        return this;
    }

    /**
     * Add an entity Ellipse to the dxf.
     * @param x_center
     * @param y_center
     * @param x_major_axis
     * @param y_major_axis
     * @param ratio_minor_axis
     * @param start_parameter
     * @param end_parameter
     */
    public addEllipse(
        x_center: number, y_center: number, x_major_axis: number, y_major_axis: number,
        ratio_minor_axis: number, start_parameter: number, end_parameter: number
    ): DXFWriter {
        this.entities.addEllipse(
            x_center, y_center, x_major_axis, y_major_axis, ratio_minor_axis,
            start_parameter, end_parameter
        );
        return this;
    }

    /**
     * Add an entity 3D Face to the dxf.
     * @param x_first
     * @param y_first
     * @param z_first
     * @param x_second
     * @param y_second
     * @param z_second
     * @param x_third
     * @param y_third
     * @param z_third
     * @param x_fourth
     * @param y_fourth
     * @param z_fourth
     */
    public add3DFace(
        x_first: number, y_first: number, z_first: number,
        x_second: number, y_second: number, z_second: number,
        x_third: number, y_third: number, z_third: number,
        x_fourth: number, y_fourth: number, z_fourth: number
    ): DXFWriter {
        this.entities.add3DFace(x_first, y_first, z_first,
            x_second, y_second, z_second,
            x_third, y_third, z_third,
            x_fourth, y_fourth, z_fourth
        );
        return this;
    }

    /**
     * Add an entity text to the the dxf.
     * @param x
     * @param y
     * @param height
     * @param value the text value
     */
    public addText(
        x: number, y: number,
        height: number, value: string,
    ): DXFWriter {
        this.entities.addText(
            x, y, height, value
        );
        return this;
    }

    /**
     * @return string get the dxf string.
     */
    public stringify(): string {
        let str: string = '';
        str += this.header.stringify();
        str += this.classes.stringify();
        str += this.tables.stringify();
        str += this.blocks.stringify();
        str += this.entities.stringify();
        str += this.objects.stringify();
        return str;
    }
}