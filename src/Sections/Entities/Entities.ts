import Point        from "./Entities/Point.js";
import Line         from "./Entities/Line.js";
import Polyline     from "./Entities/Polyline.js";
import Polyline3D   from "./Entities/Polyline3D.js";
import Circle       from "./Entities/Circle.js";
import Arc          from "./Entities/Arc.js";
import Spline       from "./Entities/Spline.js";
import Ellipse      from "./Entities/Ellipse.js";
import Face         from "./Entities/Face.js";
import Text         from "./Entities/Text.js";
import Tag          from "../../Internals/Tag.js";

export default class Entities
{
    get texts(): Text[] {
        return this._texts;
    }
    get faces(): Face[] {
        return this._faces;
    }
    get ellipses(): Ellipse[] {
        return this._ellipses;
    }
    get splines(): Spline[] {
        return this._splines;
    }
    get arcs(): Arc[] {
        return this._arcs;
    }
    get circles(): Circle[] {
        return this._circles;
    }
    get points(): Point[] {
        return this._points;
    }
    get polylines3D(): Polyline3D[] {
        return this._polylines3D;
    }
    get polylines(): Polyline[] {
        return this._polylines;
    }
    get lines(): Line[] {
        return this._lines;
    }
    private _points:        Point[] = [];
    private _lines:         Line[] = [];
    private _polylines:     Polyline[] = [];
    private _polylines3D:   Polyline3D[] = [];
    private _circles:       Circle[] = [];
    private _arcs:          Arc[] = [];
    private _splines:       Spline[] = [];
    private _ellipses:      Ellipse[] = [];
    private _faces:         Face[] = [];
    private _texts:         Text[] = [];

    public constructor() {
    }
    public addLine(
        x_start: number, y_start: number,
        x_end: number, y_end: number, layer: string
    )
    {
        this._lines.push(new Line(
            new Point(x_start, y_start, 0, layer),
            new Point(x_end, y_end, 0, layer),
            layer)
        );
    }

    public addPolyline(points: number[][], flag: number, layer: string)
    {
        this._polylines.push(
            new Polyline(points, flag, layer)
        );
    }

    public addPolyline3D(points: number[][], flag: number, layer: string)
    {
        this._polylines3D.push(
            new Polyline3D(points, flag, layer)
        );
    }

    public addPoint(x: number, y: number, z: number, layer: string)
    {
        this._points.push(
            new Point(x, y, z, layer)
        );
    }

    public addCircle(x_center: number, y_center: number, radius: number, layer: string)
    {
        this._circles.push(
            new Circle(new Point(x_center, y_center, 0, layer), radius, layer)
        );
    }

    public addArc(
        x: number, y: number, radius: number,
        startAngle: number, endAngle: number, layer: string
    )
    {
        this._arcs.push(
            new Arc(new Point(x, y, 0, layer), radius, startAngle, endAngle, layer)
        );
    }

    public addSpline(
        controlPoints: number[][], curveDegree: number,
        flag: number, knots: number[],
        weights: number[], fitPoints: number[][], layer: string
    )
    {
        this._splines.push(
            new Spline(controlPoints, curveDegree, flag, knots, weights, fitPoints, layer)
        );
    }

    public addEllipse(
        x_center: number, y_center: number, x_major_axis: number, y_major_axis: number,
        ratio_minor_axis: number, start_parameter: number, end_parameter: number, layer: string
    )
    {
        this._ellipses.push(
            new Ellipse(
                new Point( x_center, y_center, 0, layer), x_major_axis,
                y_major_axis, ratio_minor_axis, start_parameter, end_parameter, layer
            )
        );
    }

    public add3DFace(
        x_first: number, y_first: number, z_first: number,
        x_second: number, y_second: number, z_second: number,
        x_third: number, y_third: number, z_third: number,
        x_fourth: number, y_fourth: number, z_fourth: number, layer: string
    )
    {
        this._faces.push(
            new Face(
                new Point(x_first, y_first, z_first, layer),
                new Point(x_second, y_second, z_second, layer),
                new Point(x_third, y_third, z_third, layer),
                new Point(x_fourth, y_fourth, z_fourth, layer),
                layer
            )
        );
    }

    public addText(
        x: number, y: number,
        height: number, value: string, layer: string
    )
    {
        this._texts.push(
            new Text(
                new Point(x, y, 0, layer), height, value, layer
            )
        );
    }

    public tags(): Tag[] {
        let tags: Tag[] = [];
        this.points.forEach((point) => {
            tags = tags.concat(point.tags());
        });
        this.lines.forEach((line) => {
            tags = tags.concat(line.tags());
        });
        this.polylines.forEach((polyline) => {
            tags = tags.concat(polyline.tags());
        });
        this.polylines3D.forEach((polyline3D) => {
            tags = tags.concat(polyline3D.tags());
        });
        this.circles.forEach((circle) => {
            tags = tags.concat(circle.tags());
        });
        this.arcs.forEach((arc) => {
            tags = tags.concat(arc.tags());
        });
        this.splines.forEach((spline) => {
            tags = tags.concat(spline.tags());
        });
        this.ellipses.forEach((ellipse) => {
            tags = tags.concat(ellipse.tags());
        });
        this.faces.forEach((face) => {
            tags = tags.concat(face.tags());
        });
        this.texts.forEach((text) => {
            tags = tags.concat(text.tags());
        });
        return tags;
    }
    public stringify(): string {
        let str = '';
        str += new Tag(0, 'SECTION').stringify();
        str += new Tag(2, 'ENTITIES').stringify();
        str += this.tags().reduce((str, tag) => {
            return str += tag.stringify();
        }, '');
        str += new Tag(0, 'ENDSEC').stringify();
        return str;
    }

}