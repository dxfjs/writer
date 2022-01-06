import Entity from './Sections/Entities/Entity';
import { point2d, point2d_t, point3d_t } from './Internals/TagsManager';
import DxfManager from './DxfManager';
import { values_t } from './Sections/Header/DxfVariable';
import DxfObject from './Sections/Objects/DxfObject';

/**
 *
 */
export default class DxfWriter {
	private readonly _dxfManager: DxfManager;

	public get dxfManager(): DxfManager {
		return this._dxfManager;
	}

	/**
	 * The base class for creating the Dxf content.
	 */
	public constructor() {
		this._dxfManager = new DxfManager();
	}

	/**
	 * Add a header variable to the Dxf if not exist. \
	 * If exist it will updates values.
	 * @example
	 * ```js
	 * const dxf = new DxfWriter();
	 * dxf.setVariable("$ANGDIR", {70: 1});
	 * dxf.setVariable("$EXTMAX", {10: 500, 20: 500, 30: 0});
	 * ```
	 * @param name The name of the variable. Ex: $ANGDIR, $EXTMAX, ...
	 * @param values The values correspanding to the variable
	 *
	 * @returns return the current object of DxfWriter.
	 */
	public setVariable(name: string, values: values_t): this {
		this.dxfManager.header.setVariable(name, values);
		return this;
	}

	/**
	 * Add a new LineType to the Dxf.
	 *
	 * @param name name of linetype.
	 * @param descriptive the descriptive of the line ex: __ __ . __ __ .
	 * @param elements an array of the pattern. 📝 need more explications 😭
	 *
	 * @returns return the current object of DxfWriter.
	 */
	public addLineType(
		name: string,
		descriptive: string,
		elements: number[]
	): this {
		this.dxfManager.tables.addLineType(name, descriptive, elements);
		return this;
	}

	/**
	 * Add a new Layer to the Dxf.
	 *
	 * @param name  the name of the layer.
	 * @param color the color index.
	 * @param lineType the lineType name.
	 * @param flag the flag of the layer (0: is thawed, 1: is frozen).
	 * @returns return the current object of DxfWriter.
	 */
	public addLayer(name: string, color: number, lineType: string): this {
		this.dxfManager.tables.addLayer(name, color, lineType);
		return this;
	}

	/**
	 * Set the current layer of the Dxf.
	 *
	 * @param layerName the layer name.
	 * @returns return the current object of DxfWriter.
	 */
	public setCurrentLayer(layerName: string): this {
		if (
			this.dxfManager.tables.layers.find(
				(layer) => layer.name === layerName
			)
		) {
			DxfManager.currentLayerName = layerName;
		} else {
			throw new Error(
				`The layer ${layerName} doesn't exist in the LayerTable.`
			);
		}
		return this;
	}

	/**
	 * Set the units of the Dxf.
	 *
	 * @param units use DXFWriter.units to set the unit.
	 *
	 * @returns return the current object of DxfWriter.
	 */
	public setUnits(units: number): this {
		if (Object.values(DxfManager.currentUnits).indexOf(units) > -1) {
			//this.header.units = unit;
		} else {
			throw new Error(
				`The ${units} is not a valid Units, please see DXFManager.units.`
			);
		}
		return this;
	}

	public addEntity(entity: Entity) {
		this.dxfManager.entities.addEntity(entity);
		return this;
	}

	public addObject(object: DxfObject) {
		this.dxfManager.objects.addObject(object);
		return this;
	}

	/**
	 * Add a Line entity to the Dxf.
	 *
	 * @param startPoint The start point of the line.
	 * @param endPoint The end point of the line.
	 * @returns return the current object of DxfWriter.
	 */
	public addLine(startPoint: point3d_t, endPoint: point3d_t): this {
		this.dxfManager.entities.addLine(startPoint, endPoint);
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
	 * @returns return the current object of DxfWriter.
	 */
	public addLWPolyline(points: point3d_t[], flag: number): this {
		this.dxfManager.entities.addPolyline(points, flag);
		return this;
	}

	/**
	 * Add a Rectangle as closed lwpolyline entity to the Dxf.
	 * In DXF Reference there is no entity called Rectangle or Polygon.
	 * To represent this entities (Rectangle and Polygon) use Polyline entity (Closed).
	 *
	 * @param topLeft The topleft corner of the rectangle.
	 * @param bottomRight The bottom right corner of the rectangle.
	 * @returns return the current object of DxfWriter.
	 */
	public addRectangle(topLeft: point2d_t, bottomRight: point2d_t): this {
		const corners = [
			topLeft,
			point2d(bottomRight.x, topLeft.y),
			bottomRight,
			point2d(topLeft.x, bottomRight.y),
		];
		this.dxfManager.entities.addPolyline(corners, 1);
		return this;
	}

	/**
	 * Add a 3D Polyline entity to the Dxf.
	 * @param points{number[][]} an array of points like: [[x1, y1, z1], [x2, y2, z2], ...].
	 * @param flag
	 *
	 * @returns return the current object of DxfWriter.
	 */
	public addPolyline3D(points: point3d_t[], flag: number): this {
		this.dxfManager.entities.addPolyline3D(points, flag);
		return this;
	}

	/**
	 * Add a Point entity to the Dxf.
	 * @param  the X coordinate of the point.
	 * @param  the Y coordinate of the point.
	 * @param  the Z coordinate of the point.
	 *
	 * @returns return the current object of DxfWriter.
	 */
	public addPoint(x: number, y: number, z: number): this {
		this.dxfManager.entities.addPoint(x, y, z);
		return this;
	}

	/**
	 * Add a Circle entity to the Dxf.
	 * @param center The center point of the circle.
	 * @param radius The radius of the circle.
	 * @returns return the current object of DxfWriter.
	 */
	public addCircle(center: point3d_t, radius: number): this {
		this.dxfManager.entities.addCircle(center, radius);
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
	 * @returns return the current object of DxfWriter.
	 */
	public addArc(
		center: point3d_t,
		radius: number,
		startAngle: number,
		endAngle: number
	): this {
		this.dxfManager.entities.addArc(center, radius, startAngle, endAngle);
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
		weights: number[]
	): this {
		this.dxfManager.entities.addSpline(
			controlPoints,
			fitPoints,
			degreeCurve,
			flag,
			knots,
			weights
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
	 * @returns return the current object of DxfWriter.
	 */
	public addEllipse(
		center: point3d_t,
		endPointOfMajorAxis: point3d_t,
		ratioOfMinorAxisToMajorAxis: number,
		startParameter: number,
		endParameter: number
	): this {
		this.dxfManager.entities.addEllipse(
			center,
			endPointOfMajorAxis,
			ratioOfMinorAxisToMajorAxis,
			startParameter,
			endParameter
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
	 *		createPoint3d(10, 10, 10), // The insertion point.
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
	 * @returns return the current object of DxfWriter.
	 */
	public addImage(
		absolutePath: string,
		name: string,
		insertionPoint: point3d_t,
		width: number,
		height: number,
		scale: number,
		rotation: number
	) {
		this.dxfManager.addImage(
			absolutePath,
			name,
			insertionPoint,
			width,
			height,
			scale,
			rotation
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
	 * @returns return the current object of DxfWriter.
	 */
	public add3dFace(
		firstCorner: point3d_t,
		secondCorner: point3d_t,
		thirdCorner: point3d_t,
		fourthCorner: point3d_t
	): this {
		this.dxfManager.entities.add3dFace(
			firstCorner,
			secondCorner,
			thirdCorner,
			fourthCorner
		);
		return this;
	}

	/**
	 * Add a text entity to the Dxf.
	 * @param firstAlignementPoint The first alignment point of the text.
	 * @param height The text height.
	 * @param value The default value (the string itself).
	 * @returns return the current object of DxfWriter.
	 */
	public addText(
		firstAlignementPoint: point3d_t,
		height: number,
		value: string
	): this {
		this.dxfManager.entities.addText(firstAlignementPoint, height, value);
		return this;
	}

	/**
	 * Get the content of the Dxf.
	 * @return Get the Dxf string.
	 */
	public stringify(): string {
		return this.dxfManager.stringify();
	}
}