import DxfDocument from './DxfDocument';
import { values_t } from './Sections/HeaderSection/DxfVariable';
import { CommonEntityOptions } from './Sections/EntitiesSection/Entity';
import {
	lwPolylineOptions_t,
	lwPolylineVertex_t,
} from './Sections/EntitiesSection/Entities/LWPolyline';
import { vec2_t, vec3_t } from './Internals/Helpers';
import { rectangleOptions_t } from './Internals/Helpers';
import { insertOptions_t } from './Sections/EntitiesSection/Entities/Insert';
import { SplineArgs_t } from './Sections/EntitiesSection/Entities/Spline';
import { faceOptions_t } from './Sections/EntitiesSection/Entities/Face';
import {
	HatchBoundaryPaths,
	HatchGradientOptions_t,
	HatchOptions_t,
	HatchPatternOptions_t,
} from './Sections/EntitiesSection/Entities/Hatch';
import { ImageOptions_t } from './Sections/EntitiesSection/Entities/Image';
import { polylineOptions_t } from './Sections/EntitiesSection/Entities/Polyline';
import { Units } from './Internals/Enums';
import { LayerFlags } from './Sections/TablesSection/Tables/Records/DxfRecord';
import { AlignedDimOptions } from './Sections/EntitiesSection/Entities/Dimension/AlignedDimension';
import { DiameterDimOptions } from './Sections/EntitiesSection/Entities/Dimension/DiameterDimension';
import { RadialDimOptions } from './Sections/EntitiesSection/Entities/Dimension/RadialDimension';
import { LinearDimOptions } from './Sections/EntitiesSection/Entities/Dimension/LinearDimension';

/**
 * The base class for creating the dxf content.
 */
export class DxfWriter {
	readonly document: DxfDocument;

	get header() {
		return this.document.header;
	}

	get tables() {
		return this.document.tables;
	}

	get blocks() {
		return this.document.blocks;
	}

	get entities() {
		return this.document.entities;
	}

	get currentLayer() {
		return this.document.currentLayerName;
	}

	get units() {
		return this.document.currentUnits;
	}

	get modelSpace() {
		return this.document.modelSpace;
	}

	constructor() {
		this.document = new DxfDocument();
	}

	/**
	 * Add a block to the blocks tables.
	 * @param name - The block name.
	 * @returns The added block.
	 */
	addBlock(name: string) {
		return this.blocks.addBlock(name, this.document.objects);
	}

	/**
	 * Add a header variable to the dxf if not exist.
	 * If exist it will updates values.
	 *
	 * @example
	 * ```js
	 * const dxf = new DxfWriter();
	 * dxf.setVariable("$ANGDIR", {70: 1});
	 * dxf.setVariable("$EXTMAX", {10: 500, 20: 500, 30: 0});
	 * ```
	 * @param name - The name of the variable. Ex: $ANGDIR, $EXTMAX, ...
	 * @param values - The values correspanding to the variable.
	 */
	public setVariable(name: string, values: values_t) {
		this.header.setVariable(name, values);
	}

	/**
	 * Add a new LineType to the dxf.
	 *
	 * @param name - Name of the lineType.
	 * @param descriptive - The descriptive of the line ex: __ __ . __ __ .
	 * @param elements - An array of elements of the pattern. 📝 Need more explications 😭!
	 */
	public addLType(name: string, descriptive: string, elements: number[]) {
		return this.tables.addLType(name, descriptive, elements);
	}

	/**
	 * Add a Dimension style.
	 *
	 * @param name Dimension style name
	 * @returns Dimension style object
	 */
	public addDimStyle(name: string) {
		return this.tables.addDimStyle(name);
	}

	/**
	 * Add an aligned dimension entity to the dxf.
	 * @param first The first definition point for linear and angular dimensions.
	 * @param second The second definition point for linear and angular dimensions.
	 * @param options The options of the aligned dimension entity.
	 * @returns
	 */
	public addAlignedDim(
		first: vec3_t,
		second: vec3_t,
		options?: AlignedDimOptions
	) {
		return this.modelSpace.addAlignedDim(first, second, options);
	}

	/**
	 * Add an diameter dimension entity to the dxf.
	 * @param first The first definition point for diameter dimensions.
	 * @param second The second definition point for diameter dimensions.
	 * @param options The options of the diameter dimension entity.
	 * @returns
	 */
	public addDiameterDim(
		first: vec3_t,
		second: vec3_t,
		options?: DiameterDimOptions
	) {
		return this.modelSpace.addDiameterDim(first, second, options);
	}

	/**
	 * Add an radial dimension entity to the dxf.
	 * @param first The first definition point for radius dimensions.
	 * @param second The second definition point for radius dimensions.
	 * @param options The options of the radial dimension entity.
	 * @returns
	 */
	public addRadialDim(
		first: vec3_t,
		second: vec3_t,
		options?: RadialDimOptions
	) {
		return this.modelSpace.addRadialDim(first, second, options);
	}

	/**
	 * Add an linear dimension entity to the dxf.
	 * @param first The first definition point for linear and angular dimensions.
	 * @param second The second definition point for linear and angular dimensions.
	 * @param options The options of the radial dimension entity.
	 * @returns
	 */
	public addLinearDim(
		first: vec3_t,
		second: vec3_t,
		options?: LinearDimOptions
	) {
		return this.modelSpace.addLinearDim(first, second, options);
	}

	/**
	 * Add a Hatch entity to the dxf.
	 *
	 * @param boundaryPath - The boundary paths.
	 * @param fill - The fill aka solid or gradient.
	 * @param options - The options of the hatch entity.
	 * @returns The added hatch entity.
	 */
	public addHatch(
		boundaryPath: HatchBoundaryPaths,
		fill: HatchPatternOptions_t | HatchGradientOptions_t,
		options?: HatchOptions_t
	) {
		return this.modelSpace.addHatch(boundaryPath, fill, options);
	}

	/**
	 * Add a new Layer to the dxf.
	 *
	 * @param name - The name of the layer.
	 * @param color - The color number. See [AutoCAD Color Index](https://gohtx.com/acadcolors.php).
	 * @param lineType - The lineType name.
	 * @param flags - Layer standard flags (bit-coded values).
	 * @returns Return the the added layer.
	 */
	public addLayer(
		name: string,
		color: number,
		lineType: string,
		flags = LayerFlags.None
	) {
		return this.tables.addLayer(name, color, lineType, flags);
	}

	/**
	 * Set the current layer name of the dxf.
	 * @throws
	 * @param name - The layer name.
	 */
	public setCurrentLayerName(name: string) {
		this.document.setCurrentLayerName(name);
	}

	/**
	 * Set the units of the dxf.
	 *
	 * @param units - The units for AutoCAD DesignCenter blocks.
	 */
	public setUnits(units: Units) {
		this.document.setUnits(units);
	}

	/**
	 * Add a Line entity to the dxf.
	 *
	 * @param startPoint - The start point of the line.
	 * @param endPoint - The end point of the line.
	 * @param options - The options of the line entity.
	 * @returns Return the added line.
	 */
	public addLine(
		startPoint: vec3_t,
		endPoint: vec3_t,
		options?: CommonEntityOptions
	) {
		return this.modelSpace.addLine(startPoint, endPoint, options);
	}

	/**
	 * Add a LWPolyline entity to the dxf.
	 *
	 * [Dxf Polyline](http://help.autodesk.com/view/OARX/2018/ENU/?guid=GUID-ABF6B778-BE20-4B49-9B58-A94E64CEFFF3)
	 *
	 * The Polyline entity can represent the Rectangle and the Polygon
	 * just pass the array of points and LWPolylineFlags.Closed flag.
	 *
	 * @param points - An array of {@link lwPolylineVertex_t}.
	 * @param options - The options of LWPolyline entity.
	 *
	 * @returns Return the the added lwpolyline.
	 */
	public addLWPolyline(
		points: lwPolylineVertex_t[],
		options?: lwPolylineOptions_t
	) {
		return this.modelSpace.addLWPolyline(points, options);
	}

	/**
	 * Add a Rectangle as closed lwpolyline entity to the dxf.
	 * In DXF Reference there is no entity called Rectangle or Polygon.
	 * To represent this entities (Rectangle and Polygon) use Polyline entity (Closed).
	 *
	 * @param topLeft - The topleft corner of the rectangle.
	 * @param bottomRight - The bottom right corner of the rectangle.
	 * @param options - The options to apply to the rectangle.
	 * @returns Return the the added lwpolyline.
	 */
	public addRectangle(
		topLeft: vec2_t,
		bottomRight: vec2_t,
		options?: rectangleOptions_t
	) {
		return this.modelSpace.addRectangle(
			topLeft,
			bottomRight,
			options || {}
		);
	}

	/**
	 * Add a 3D Polyline entity to the dxf.
	 *
	 * @param points - An array of points.
	 * @param options - The options to apply to the polyline.
	 *
	 * @returns Return the the added polyline.
	 */
	public addPolyline3D(
		points: (vec3_t | vec2_t)[],
		options?: polylineOptions_t
	) {
		return this.modelSpace.addPolyline3D(points, options);
	}

	/**
	 * Add a Point entity to the dxf.
	 *
	 * @param x - The X coordinate of the point.
	 * @param y - The Y coordinate of the point.
	 * @param z - The Z coordinate of the point.
	 * @param options - The options to apply to the point.
	 * @returns Return the the added point.
	 */
	public addPoint(
		x: number,
		y: number,
		z: number,
		options?: CommonEntityOptions
	) {
		return this.modelSpace.addPoint(x, y, z, options);
	}

	/**
	 * Add a Circle entity to the dxf.
	 *
	 * @param center - The center point of the circle.
	 * @param radius - The radius of the circle.
	 * @param options - The Circle entity options;
	 * @returns Return the the added circle.
	 */
	public addCircle(
		center: vec3_t,
		radius: number,
		options?: CommonEntityOptions
	) {
		return this.modelSpace.addCircle(center, radius, options);
	}

	/**
	 * Add an Arc entity to the dxf.
	 *
	 * @param center - The center of the arc.
	 * @param radius - The radius of the arc.
	 * @param startAngle - The start of the angle (begining of arc) in degrees Anticlockwise.
	 * @param endAngle - The end of the angle (end of arc) in degrees Anticlockwise. \
	 * 					 Angles always start from X-axis towards anticlockwise.
	 * @param options - Arc entity options.
	 * @returns Return the the added arc.
	 */
	public addArc(
		center: vec3_t,
		radius: number,
		startAngle: number,
		endAngle: number,
		options?: CommonEntityOptions
	) {
		return this.modelSpace.addArc(
			center,
			radius,
			startAngle,
			endAngle,
			options
		);
	}

	/**
	 * Add a Spline entity to the dxf. It's a NURBS.
	 *
	 * NURBS, Non-Uniform Rational B-Splines, are mathematical representations of 3D geometry that
	 * can accurately describe any shape from a simple 2D line, circle, arc, or curve to the most
	 * complex 3D organic free-form surface or solid. Because of their flexibility and accuracy,
	 * NURBS models can be used in any process, from illustration and animation to manufacturing.
	 *
	 * For more informations see : [NURBS](https://www.rhino3d.com/features/nurbs/) and
	 * [Dxf Spline](http://help.autodesk.com/view/OARX/2018/ENU/?guid=GUID-E1F884F8-AA90-4864-A215-3182D47A9C74)
	 *
	 * @param splineArgs - The Spline arguments. See {@link SplineArgs}.
	 * @param options - The options of the spline entity.
	 * @returns Return the the added spline.
	 */
	public addSpline(splineArgs: SplineArgs_t, options?: CommonEntityOptions) {
		return this.modelSpace.addSpline(splineArgs, options);
	}

	/**
	 * Add an Ellipse entity to the dxf.
	 *
	 * @param center - The center point of the ellipse.
	 * @param endPointOfMajorAxis - The end point of major axis, relative to the center of the ellipse.
	 * @param ratioOfMinorAxisToMajorAxis - The ratio of minor axis to major axis.
	 * @param startParameter - The start parameter (this value is 0.0 for a full ellipse).
	 * @param endParameter - The end parameter (this value is 2pi for a full ellipse).
	 * @returns Return the the added ellipse.
	 */
	public addEllipse(
		center: vec3_t,
		endPointOfMajorAxis: vec3_t,
		ratioOfMinorAxisToMajorAxis: number,
		startParameter: number,
		endParameter: number,
		options?: CommonEntityOptions
	) {
		return this.modelSpace.addEllipse(
			center,
			endPointOfMajorAxis,
			ratioOfMinorAxisToMajorAxis,
			startParameter,
			endParameter,
			options
		);
	}

	/**
	 * Add an Image entity to the dxf.
	 * @example
	 * ```js
	 * const dxf = new DxfWriter();
	 * dxf.addImage(
	 * 	'.\\test.png',		 // Or the absolute path if not in the same folder.
	 * 	'test',				// The name of the image.
	 * 	point3d(10, 10, 0),	// The insertion point.
	 * 	600,				   // The width of the image in pixels.
	 * 	600, 				  //The height of the image in pixels.
	 * 	1, 					// The scale to be applied to the image.
	 * 	0 					 //The scale to be applied to the image.
	 * );
	 * ```
	 * @param imagePath - The path of the image.
	 * @param name - The name of the image.
	 * @param insertionPoint - The insertion point.
	 * @param width - The width of the image in pixels.
	 * @param height - The height of the image in pixels.
	 * @param scale - The scale to be applied to the image.
	 * @param rotation - The rotation angle (Degrees) to be applied to the image.
	 * @returns Return the the added image.
	 */
	public addImage(
		imagePath: string,
		name: string,
		insertionPoint: vec3_t,
		width: number,
		height: number,
		scale: number,
		rotation: number,
		options?: ImageOptions_t
	) {
		return this.modelSpace.addImage(
			imagePath,
			name,
			insertionPoint,
			width,
			height,
			scale,
			rotation,
			options
		);
	}

	/**
	 * Add a 3D Face entity to the dxf.
	 *
	 * @param firstCorner - The first corner of the 3d face.
	 * @param secondCorner - The first corner of the 3d face.
	 * @param thirdCorner - The first corner of the 3d face.
	 * @param fourthCorner - The first corner of the 3d face. \
	 * If you want only three corners, make this is the same as the third corner
	 * @param options - The options of the 3dFace antity.
	 * @returns Return the the added face.
	 */
	public add3dFace(
		firstCorner: vec3_t,
		secondCorner: vec3_t,
		thirdCorner: vec3_t,
		fourthCorner: vec3_t,
		options?: faceOptions_t
	) {
		return this.modelSpace.add3dFace(
			firstCorner,
			secondCorner,
			thirdCorner,
			fourthCorner,
			options
		);
	}

	/**
	 * Add a text entity to the dxf.
	 * @param firstAlignementPoint - The first alignment point of the text.
	 * @param height - The text height.
	 * @param value - The default value (the string itself).
	 * @returns Return the the added text.
	 */
	public addText(
		firstAlignementPoint: vec3_t,
		height: number,
		value: string,
		options?: CommonEntityOptions
	) {
		return this.modelSpace.addText(
			firstAlignementPoint,
			height,
			value,
			options
		);
	}

	/**
	 * Add an insert entity to the dxf.
	 *
	 * @param blockName - The name of the block to insert.
	 * @param insertionPoint - The point where the block is to be inserted.
	 * @param options - The options of the Insert entity.
	 * @returns Return the the added insert.
	 */
	public addInsert(
		blockName: string,
		insertionPoint: vec3_t,
		options?: insertOptions_t
	) {
		return this.modelSpace.addInsert(blockName, insertionPoint, options);
	}

	/**
	 * Get the content of the dxf.
	 *
	 * @returns Return the dxf string.
	 */
	public stringify(): string {
		return this.document.stringify();
	}
}
