import { point2d_t, point3d_t } from './Internals/TagsManager';
import DxfManager from './DxfManager';
import { values_t } from './Sections/Header/DxfVariable';
import GlobalState from './GlobalState';
import { options_t } from './Sections/Entities/Entity';
import {
	lwPolylineOptions_t,
	lwPolylineVertex_t,
} from './Sections/Entities/Entities/LWPolyline';
import { rectangleOptions_t } from './Internals/Utils';

/**
 *
 */
export default class DxfWriter {
	/** @internal */
	private _dxfManager: DxfManager;

	/**
	 * The base class for creating the Dxf content.
	 */
	public constructor() {
		this._dxfManager = new DxfManager();
	}

	/**
	 * Add a header variable to the Dxf if not exist. \
	 * If exist it will updates values.
	 *
	 * @example
	 * ```js
	 * const dxf = new DxfWriter();
	 * dxf.setVariable("$ANGDIR", {70: 1});
	 * dxf.setVariable("$EXTMAX", {10: 500, 20: 500, 30: 0});
	 * ```
	 * @param name The name of the variable. Ex: $ANGDIR, $EXTMAX, ...
	 * @param values The values correspanding to the variable.
	 * @returns Return the current object of DxfWriter.
	 */
	public setVariable(name: string, values: values_t): this {
		this._dxfManager.headerSection.setVariable(name, values);
		return this;
	}

	/**
	 * Add a new LineType to the Dxf.
	 *
	 * @param name Name of the lineType.
	 * @param descriptive The descriptive of the line ex: __ __ . __ __ .
	 * @param elements An array of elements of the pattern. 📝 Need more explications 😭!
	 *
	 * @returns Return the current object of DxfWriter.
	 */
	public addLineType(
		name: string,
		descriptive: string,
		elements: number[]
	): this {
		this._dxfManager.tablesSection.addLineType(name, descriptive, elements);
		return this;
	}

	/**
	 * Add a new Layer to the Dxf.
	 *
	 * @param name The name of the layer.
	 * @param color The color number. See [AutoCAD Color Index](https://gohtx.com/acadcolors.php).
	 * @param lineType The lineType name.
	 * @returns Return the current object of DxfWriter.
	 */
	public addLayer(name: string, color: number, lineType: string): this {
		this._dxfManager.tablesSection.addLayer(name, color, lineType);
		return this;
	}

	/**
	 * Set the current layer name of the Dxf.
	 * @throws
	 * @param name the layer name.
	 * @returns Return the current object of DxfWriter.
	 */
	public setCurrentLayerName(name: string): this {
		this._dxfManager.setCurrentLayerName(name);
		return this;
	}

	/**
	 * Set the units of the Dxf.
	 *
	 * @throws
	 * @param units use DXFWriter.units to set the unit.
	 * @returns Return the current object of DxfWriter.
	 */
	public setUnits(units: number): this {
		if (Object.values(GlobalState.units).indexOf(units) > -1) {
			GlobalState.units = units;
		} else {
			throw new Error(`The ${units} is not a valid Units.`);
		}
		return this;
	}

	/**
	 * Add a Line entity to the Dxf.
	 *
	 * @param startPoint The start point of the line.
	 * @param endPoint The end point of the line.
	 * @returns Return the current object of DxfWriter.
	 */
	public addLine(
		startPoint: point3d_t,
		endPoint: point3d_t,
		options: options_t = {}
	): this {
		this._dxfManager.entitiesSection.addLine(startPoint, endPoint, options);
		return this;
	}

	/**
	 * Add a Polyline entity to the Dxf.
	 * @link http://help.autodesk.com/view/OARX/2018/ENU/?guid=GUID-ABF6B778-BE20-4B49-9B58-A94E64CEFFF3.
	 *
	 * The Polyline entity can represent the Rectangle and the Polygon \
	 * just pass the array of points and PolylineFlags.Closed flag (flag = 1).
	 *
	 * @param points An array of points like: [[x1, y1], [x2, y2], ...].
	 * @param flag An enteger number represent the Polyline flag.
	 *
	 * @returns Return the current object of DxfWriter.
	 */
	public addLWPolyline(
		points: lwPolylineVertex_t[],
		options: lwPolylineOptions_t = {}
	): this {
		this._dxfManager.entitiesSection.addLWPolyline(points, options);
		return this;
	}

	/**
	 * Add a Rectangle as closed lwpolyline entity to the Dxf.
	 * In DXF Reference there is no entity called Rectangle or Polygon.
	 * To represent this entities (Rectangle and Polygon) use Polyline entity (Closed).
	 *
	 * @param topLeft The topleft corner of the rectangle.
	 * @param bottomRight The bottom right corner of the rectangle.
	 * @returns Return the current object of DxfWriter.
	 */

	/**
	 * Add a Rectangle as closed lwpolyline entity to the Dxf.
	 * In DXF Reference there is no entity called Rectangle or Polygon.
	 * To represent this entities (Rectangle and Polygon) use Polyline entity (Closed).
	 *
	 * @param topLeft The topleft corner of the rectangle.
	 * @param bottomRight The bottom right corner of the rectangle.
	 * @param options The options to apply to the rectangle.
	 * @returns Return the current object of DxfWriter.
	 */
	public addRectangle(
		topLeft: point2d_t,
		bottomRight: point2d_t,
		options?: rectangleOptions_t
	): this {
		this._dxfManager.entitiesSection.addRectangle(
			topLeft,
			bottomRight,
			options || {}
		);
		return this;
	}

	/**
	 * Add a 3D Polyline entity to the Dxf.
	 * @param points{number[][]} an array of points like: [[x1, y1, z1], [x2, y2, z2], ...].
	 * @param flag
	 *
	 * @returns Return the current object of DxfWriter.
	 */
	public addPolyline3D(
		points: point3d_t[],
		flag: number,
		options: options_t = {}
	): this {
		this._dxfManager.entitiesSection.addPolyline3D(points, flag, options);
		return this;
	}

	/**
	 * Add a Point entity to the Dxf.
	 * @param  the X coordinate of the point.
	 * @param  the Y coordinate of the point.
	 * @param  the Z coordinate of the point.
	 *
	 * @returns Return the current object of DxfWriter.
	 */
	public addPoint(
		x: number,
		y: number,
		z: number,
		options: options_t = {}
	): this {
		this._dxfManager.entitiesSection.addPoint(x, y, z, options);
		return this;
	}

	/**
	 * Add a Circle entity to the Dxf.
	 * @param center The center point of the circle.
	 * @param radius The radius of the circle.
	 * @returns Return the current object of DxfWriter.
	 */
	public addCircle(
		center: point3d_t,
		radius: number,
		options: options_t = {}
	): this {
		this._dxfManager.entitiesSection.addCircle(center, radius, options);
		return this;
	}

	/**
	 * Add an Arc entity to the Dxf.
	 *
	 * @param x_center     the X coordinate of the center of the arc.
	 * @param y_center     the Y coordinate of the center of the arc.
	 * @param radius       the radius of the arc.
	 * @param startAngle  the start of the angle (begining of arc) in degrees Anticlockwise.
	 * @param endAngle     the end of the angle (end of arc) in degrees Anticlockwise.
	 *
	 * 📝 Angles always start from X-axis towards anticlockwise.
	 *
	 * @returns Return the current object of DxfWriter.
	 */
	public addArc(
		center: point3d_t,
		radius: number,
		startAngle: number,
		endAngle: number,
		options: options_t = {}
	): this {
		this._dxfManager.entitiesSection.addArc(
			center,
			radius,
			startAngle,
			endAngle,
			options
		);
		return this;
	}

	/**
	 * Add a Spline entity to the Dxf. It's a NURBS.
	 *
	 * NURBS, Non-Uniform Rational B-Splines, are mathematical representations of 3D geometry that
	 * can accurately describe any shape from a simple 2D line, circle, arc, or curve to the most
	 * complex 3D organic free-form surface or solid. Because of their flexibility and accuracy,
	 * NURBS models can be used in any process, from illustration and animation to manufacturing.
	 *
	 * For more informations see :
	 * @link https://www.rhino3d.com/features/nurbs/.
	 * @link http://help.autodesk.com/view/OARX/2018/ENU/?guid=GUID-E1F884F8-AA90-4864-A215-3182D47A9C74.
	 *
	 * @param controlPoints The control points of the spline.
	 * @param fitPoints The fit points of the spline.
	 * @param degreeCurve The degree curve of the spline, mostly 3.
	 * @param flag An integer represent the flag of the spline.
	 * @param knots The knots of th spline. If you don't know what is this set it to an empty array [].
	 * @param weights The weights of th spline. If you don't know what is this set it to an empty array [].
	 */
	public addSpline(
		controlPoints: point3d_t[],
		fitPoints: point3d_t[],
		degreeCurve: number,
		flag: number,
		knots: number[],
		weights: number[],
		options: options_t = {}
	): this {
		this._dxfManager.entitiesSection.addSpline(
			controlPoints,
			fitPoints,
			degreeCurve,
			flag,
			knots,
			weights,
			options
		);
		return this;
	}

	/**
	 * Add an Ellipse entity to the Dxf.
	 *
	 * @param center The center point of the ellipse.
	 * @param endPointOfMajorAxis The end point of major axis, relative to the center of the ellipse.
	 * @param ratioOfMinorAxisToMajorAxis The ratio of minor axis to major axis.
	 * @param startParameter The start parameter (this value is 0.0 for a full ellipse).
	 * @param endParameter The end parameter (this value is 2pi for a full ellipse).
	 * @returns Return the current object of DxfWriter.
	 */
	public addEllipse(
		center: point3d_t,
		endPointOfMajorAxis: point3d_t,
		ratioOfMinorAxisToMajorAxis: number,
		startParameter: number,
		endParameter: number,
		options: options_t = {}
	): this {
		this._dxfManager.entitiesSection.addEllipse(
			center,
			endPointOfMajorAxis,
			ratioOfMinorAxisToMajorAxis,
			startParameter,
			endParameter,
			options
		);
		return this;
	}

	/**
	 * Add an image entity to the Dxf.
	 *
	 * @example
	 * ```js
	 * const dxf = new DxfWriter();
	 * dxf.addImage(
	 *		'E:/folder/subfolder/test.png', // The absolute path of the image.
	 *		'test', // The name of the image.
	 *		point3d(10, 10, 0), // The insertion point.
	 *		600, // The width of the image in pixels.
	 *		600, //The height of the image in pixels.
	 *		1, // The scale to be applied to the image.
	 *		0 //The scale to be applied to the image.
	 * );
	 * ```
	 * @param absolutePath The absolute path of the image.
	 * @param name The name of the image.
	 * @param insertionPoint The insertion point.
	 * @param width The width of the image in pixels.
	 * @param height The height of the image in pixels.
	 * @param scale The scale to be applied to the image.
	 * @param rotation The rotation angle (Degrees) to be applied to the image.
	 * @returns Return the current object of DxfWriter.
	 */
	public addImage(
		absolutePath: string,
		name: string,
		insertionPoint: point3d_t,
		width: number,
		height: number,
		scale: number,
		rotation: number,
		options: options_t = {}
	) {
		this._dxfManager.addImage(
			absolutePath,
			name,
			insertionPoint,
			width,
			height,
			scale,
			rotation,
			options
		);
		return this;
	}

	/**
	 * Add a 3D Face entity to the Dxf.
	 *
	 * @param firstCorner The first corner of the 3d face.
	 * @param secondCorner The first corner of the 3d face.
	 * @param thirdCorner The first corner of the 3d face.
	 * @param fourthCorner The first corner of the 3d face.
	 * @returns Return the current object of DxfWriter.
	 */
	public add3dFace(
		firstCorner: point3d_t,
		secondCorner: point3d_t,
		thirdCorner: point3d_t,
		fourthCorner: point3d_t,
		options: options_t = {}
	): this {
		this._dxfManager.entitiesSection.add3dFace(
			firstCorner,
			secondCorner,
			thirdCorner,
			fourthCorner,
			options
		);
		return this;
	}

	/**
	 * Add a text entity to the Dxf.
	 * @param firstAlignementPoint The first alignment point of the text.
	 * @param height The text height.
	 * @param value The default value (the string itself).
	 * @returns Return the current object of DxfWriter.
	 */
	public addText(
		firstAlignementPoint: point3d_t,
		height: number,
		value: string,
		options: options_t = {}
	): this {
		this._dxfManager.entitiesSection.addText(
			firstAlignementPoint,
			height,
			value,
			options
		);
		return this;
	}

	/**
	 * Get the content of the Dxf.
	 * @return Get the Dxf string.
	 */
	public stringify(): string {
		return this._dxfManager.stringify();
	}
}
