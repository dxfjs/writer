import DXFManager from './Internals/DXFManager';
import DxfHeader from './Sections/Header/DxfHeader';
import DxfTables from './Sections/Tables/DxfTables';
import DxfBlocks from './Sections/Blocks/DxfBlocks';
import Entities from './Sections/Entities/Entities';
import Entity, { PolylineFlags, SplineFlags } from './Sections/Entities/Entity';
import DxfObjects from './Sections/Objects/DxfObjects';
import DxfDictionary from './Sections/Objects/Objects/DxfDictionary';
import DxfObject from './Sections/Objects/DxfObject';
import { createTag } from './Internals/TagsManager';
import DxfClasses from './Sections/Classes/DxfClasses';

export default class DXFWriter extends DXFManager {
	private header: DxfHeader;
	private classes: DxfClasses;
	private tables: DxfTables;
	private blocks: DxfBlocks;
	private entities: Entities;
	private objects: DxfObjects;

	/**
	 * The base class for creating the dxf content.
	 * @param version{string} Not working at this moment 😞. Do not bother yourself using it.
	 *                        Use DXFWriter.versions to set the version.
	 */
	public constructor(version: string = DXFManager.versions.R2007) {
		super();
		this.setVersion(version);

		this.header = new DxfHeader();
		this.classes = new DxfClasses();
		this.blocks = new DxfBlocks();
		this.tables = this.blocks.tables;
		this.entities = this.header.entities;
		this.objects = new DxfObjects();
		this.tables.entities = this.header.entities;
	}

	/**
	 * Add a variable to the Header section of the dxf.
	 *
	 * @param name {string} The name of the variable.
	 * @param values {[number, (number | string)][]}
	 *
	 * @returns {DXFWriter} return the instance of DXFWriter.
	 */
	public addVariable(
		name: string,
		values: [number, number | string][]
	): DXFWriter {
		this.header.setVariable(
			name,
			values.map((tag) => {
				const [groupCode, value] = tag;
				return createTag(groupCode, value);
			})
		);
		return this;
	}

	/**
	 * Add a new LineType o the dxf.
	 *
	 * @param name {string} name of linetype.
	 * @param descriptive {string} the descriptive of the line ex: __ __ . __ __ .
	 * @param elements {number[]} an array of the pattern. 📝 need more explications 😭
	 *
	 * @returns {DXFWriter} return the instance of DXFWriter.
	 */
	public addLineType(
		name: string,
		descriptive: string,
		elements: number[]
	): DXFWriter {
		this.tables.addLineType(name, descriptive, elements);
		return this;
	}

	/**
	 * Add a new Layer to the dxf.
	 *
	 * @param name  {string} the name of the layer.
	 * @param color {number} the color index.
	 * @param lineType {string} the lineType name.
	 * @param flag  {number} the flag of the layer (0: is thawed, 1: is frozen).
	 *
	 * @returns {DXFWriter} return the instance of DXFWriter.
	 */
	public addLayer(name: string, color: number, lineType: string): DXFWriter {
		this.tables.addLayer(name, color, lineType);
		return this;
	}

	/**
	 * Set the current Layer.
	 *
	 * @param layerName {string} the layer name.
	 *
	 * @returns {DXFWriter} return the instance of DXFWriter.
	 */
	public setCurrentLayer(layerName: string): DXFWriter {
		if (this.tables.layers.find((layer) => layer.name === layerName)) {
			DXFManager.currentLayer = layerName;
		} else {
			throw new Error(
				`The layer ${layerName} doesn't exist in the LayerTable.`
			);
		}
		return this;
	}

	/**
	 * Set the unit of the dxf.
	 *
	 * @param unit {number} use DXFWriter.units to set the unit.
	 *
	 * @returns {DXFWriter} return the instance of DXFWriter.
	 */
	public setUnit(unit: number): DXFWriter {
		if (Object.values(DXFManager.units).indexOf(unit) > -1) {
			this.header.units = unit;
		} else {
			throw new Error(
				`The ${unit} is not a valid Unit, please see DXFManager.units.`
			);
		}
		return this;
	}

	/**
	 * Set the version of the dxf.
	 * Not working at this moment :(. Do bot bother using it.
	 * @param version {string} use DXFWriter.versions to set the version.
	 * @returns {DXFWriter} return the instance of DXFWriter.
	 */
	public setVersion(version: string): DXFWriter {
		if (Object.values(DXFManager.versions).indexOf(version) > -1) {
			DXFManager.version = version;
		} else {
			throw new Error(
				`The ${version} is not a valid Version, please see DXFManager.versions.`
			);
		}
		return this;
	}

	public addEntity(entity: Entity) {
		this.entities.addEntity(entity);
		return this;
	}

	public addObject(object: DxfObject) {
		this.objects.addObject(object);
		return this;
	}

	public addDictionary(name: string, entryObject: DXFManager) {
		const dictionary = new DxfDictionary();
		dictionary.addEntryObject(name, entryObject.handle);
		this.objects.addObject(dictionary);
		return this;
	}

	/**
	 * Add a Line entity to the dxf in the current Layer.
	 * @param x_start {number} the X coordinate of the first point.
	 * @param y_start {number} the Y coordinate of the first point.
	 * @param x_end   {number} the X coordinate of the second point.
	 * @param y_end   {number} the Y coordinate of the second point.
	 * @returns {DXFWriter} return the instance of DXFWriter.
	 */
	public addLine(
		x_start: number,
		y_start: number,
		x_end: number,
		y_end: number
	): DXFWriter {
		this.entities.addLine(x_start, y_start, x_end, y_end);
		return this;
	}

	/**
	 * Add a Polyline entity to the dxf in the current Layer.
	 * @link http://help.autodesk.com/view/OARX/2018/ENU/?guid=GUID-ABF6B778-BE20-4B49-9B58-A94E64CEFFF3.
	 *
	 * The Polyline entity can represent the Rectangle and the Polygon \
	 * just pass the array of points and PolylineFlags.Closed flag (flag = 1).
	 *
	 * @param points {number[][]}    an array of points like: [[x1, y1], [x2, y2], ...].
	 * @param flag   {PolylineFlags} an enteger number represent the Polyline flag.
	 *
	 * @returns {DXFWriter} return the instance of DXFWriter.
	 */
	public addPolyline(points: number[][], flag: PolylineFlags): DXFWriter {
		this.entities.addPolyline(points, flag);
		return this;
	}

	/**
	 * Add a Rectangle as Polyline entity (Closed) to the dxf in the current Layer.
	 * In DXF Reference there is no entity called Rectangle or Polygon.
	 * To represent this entities (Rectangle and Polygon) use Polyline entity (Closed).
	 *
	 * @param top_left_x     {number} the X coordinate of the Top Lef corner of the rectangle.
	 * @param top_left_y     {number} the Y coordinate of the Top Lef corner of the rectangle.
	 * @param bottom_right_x {number} the X coordinate of the Bottom Right corner of the rectangle.
	 * @param bottom_right_y {number} the Y coordinate of the Bottom Right corner of the rectangle.
	 *
	 * @returns {DXFWriter} return the instance of DXFWriter.
	 */
	public addRectangle(
		top_left_x: number,
		top_left_y: number,
		bottom_right_x: number,
		bottom_right_y: number
	): DXFWriter {
		const corners = [
			[top_left_x, top_left_y],
			[bottom_right_x, top_left_y],
			[bottom_right_x, bottom_right_y],
			[top_left_x, bottom_right_y],
		];

		this.entities.addPolyline(corners, PolylineFlags.Closed);
		return this;
	}

	/**
	 * Add a 3D Polyline entity to the dxf in the current Layer.
	 * @param points{number[][]} an array of points like: [[x1, y1, z1], [x2, y2, z2], ...].
	 * @param flag
	 *
	 * @returns {DXFWriter} return the instance of DXFWriter.
	 */
	public addPolyline3D(points: number[][], flag: number): DXFWriter {
		this.entities.addPolyline3D(points, flag);
		return this;
	}

	/**
	 * Add a Point entity to the dxf in the current Layer.
	 * @param x {number} the X coordinate of the point.
	 * @param y {number} the Y coordinate of the point.
	 * @param z {number} the Z coordinate of the point.
	 *
	 * @returns {DXFWriter} return the instance of DXFWriter.
	 */
	public addPoint(x: number, y: number, z: number): DXFWriter {
		this.entities.addPoint(x, y, z);
		return this;
	}

	/**
	 * Add a Circle entity to the dxf in the current Layer.
	 * @param x_center  {number} the X coordinate of the center of the circle.
	 * @param y_center  {number} the Y coordinate of the center of the circle.
	 * @param radius    {number} the radius of the circle.
	 *
	 * @returns {DXFWriter} return the instance of DXFWriter.
	 */
	public addCircle(
		x_center: number,
		y_center: number,
		radius: number
	): DXFWriter {
		this.entities.addCircle(x_center, y_center, radius);
		return this;
	}

	/**
	 * Add an Arc entity to the dxf in the current Layer.
	 *
	 * @param x_center      {number} the X coordinate of the center of the arc.
	 * @param y_center      {number} the Y coordinate of the center of the arc.
	 * @param radius        {number} the radius of the arc.
	 * @param start_angle   {number} the start of the angle (begining of arc) in degrees Anticlockwise.
	 * @param endAngle      {number} the end of the angle (end of arc) in degrees Anticlockwise.
	 *
	 * 📝 Angles always start from X-axis towards anticlockwise.
	 *
	 * @returns {DXFWriter} return the instance of DXFWriter.
	 */
	public addArc(
		x_center: number,
		y_center: number,
		radius: number,
		start_angle: number,
		endAngle: number
	): DXFWriter {
		this.entities.addArc(x_center, y_center, radius, start_angle, endAngle);
		return this;
	}

	/**
	 * Add a Spline entity to the dxf. It's a NURBS.
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
	 * @param control_points {[number, number][]} the control points of the spline.
	 * @param fit_points {[number, number][]} the fit points for the spline.
	 * @param curve_degree {number} the curve degree of the spline, mostly 3.
	 * @param flag {SplineFlags} an integer represent the flag of the spline.
	 * @param knots {number[]} the knots of th spline. If you don't know what is this set it to an empty array []
	 * @param weights {number[]} the weights of th spline. If you don't know what is this set it to an empty array []
	 */
	public addSpline(
		control_points: number[][],
		fit_points: number[][],
		curve_degree: number,
		flag: SplineFlags,
		knots: number[],
		weights: number[]
	): DXFWriter {
		this.entities.addSpline(
			control_points,
			fit_points,
			curve_degree,
			flag,
			knots,
			weights
		);
		return this;
	}

	/**
	 * Add an Ellipse entity to the dxf in the current Layer.
	 *
	 * @param x_center
	 * @param y_center
	 * @param x_major_axis
	 * @param y_major_axis
	 * @param ratio_minor_axis
	 * @param start_parameter
	 * @param end_parameter
	 */
	public addEllipse(
		x_center: number,
		y_center: number,
		x_major_axis: number,
		y_major_axis: number,
		ratio_minor_axis: number,
		start_parameter: number,
		end_parameter: number
	): DXFWriter {
		this.entities.addEllipse(
			x_center,
			y_center,
			x_major_axis,
			y_major_axis,
			ratio_minor_axis,
			start_parameter,
			end_parameter
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
		x_first: number,
		y_first: number,
		z_first: number,
		x_second: number,
		y_second: number,
		z_second: number,
		x_third: number,
		y_third: number,
		z_third: number,
		x_fourth: number,
		y_fourth: number,
		z_fourth: number
	): DXFWriter {
		this.entities.add3DFace(
			x_first,
			y_first,
			z_first,
			x_second,
			y_second,
			z_second,
			x_third,
			y_third,
			z_third,
			x_fourth,
			y_fourth,
			z_fourth
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
		x: number,
		y: number,
		height: number,
		value: string
	): DXFWriter {
		this.entities.addText(x, y, height, value);
		return this;
	}

	/**
	 * Set the current true color for all coming entities.
	 * @param red The red value between 0 and 255
	 * @param green The green value between 0 and 255
	 * @param blue The blue value between 0 and 255
	 * @returns {DXFWriter}
	 */
	public setTrueColor(red: number, green: number, blue: number): DXFWriter {
		DXFManager.setTrueColorRGB(red, green, blue);
		return this;
	}

	/**
	 * Set the current true color for all coming entities.
	 * @param red The red value between 0 and 255
	 * @param green The green value between 0 and 255
	 * @param blue The blue value between 0 and 255
	 * @returns {DXFWriter}
	 */
	public setTrueColorRGB(
		red: number,
		green: number,
		blue: number
	): DXFWriter {
		DXFManager.setTrueColorRGB(red, green, blue);
		return this;
	}

	/**
	 * Set the current true color for all coming entities.
	 * @param hex The hexadecimal representation of the color.
	 * @returns {DXFWriter}
	 */
	public setTrueColorHex(hex: string): DXFWriter {
		DXFManager.setTrueColorHex(hex);
		return this;
	}

	/**
	 * Unset the current true color to stop using it in coming entities.
	 * @returns {DXFWriter}
	 */
	public unsetTrueColor(): DXFWriter {
		DXFManager.unsetTrueColor();
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
