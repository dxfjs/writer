import Entity, { CommonEntityOptions } from './Entity';
import DxfInterface from 'Internals/Interfaces/DxfInterface';
import { boundingBox_t, BoundingBox } from 'Internals/BoundingBox';
import {
	LWPolyline,
	LWPolylineFlags,
	LWPolylineOptions,
	LWPolylineVertex,
} from './Entities/LWPolyline';
import { bulge, point2d, vec2_t, vec3_t } from 'Internals/Helpers';
import { rectangleOptions_t } from 'Internals/Helpers';
import { Polyline, PolylineOptions, PolylineVertex } from './Entities/Polyline';
import Handle from 'Internals/Handle';
import { Insert, insertOptions_t } from './Entities/Insert';
import {
	Hatch,
	HatchBoundaryPaths,
	HatchGradientOptions_t,
	HatchOptions_t,
	HatchPatternOptions_t,
} from './Entities/Hatch';
import DxfObjectsSection from 'ObjectsSection/DxfObjectsSection';
import { Image, ImageOptions_t } from './Entities/Image';
import { Dxfier } from 'Internals/Dxfier';
import { AlignedDimension, AlignedDimOptions } from './Entities/Dimension/AlignedDimension';
import { DiameterDimension, DiameterDimOptions } from './Entities/Dimension/DiameterDimension';
import { RadialDimension, RadialDimOptions } from './Entities/Dimension/RadialDimension';
import { LinearDimension, LinearDimOptions } from './Entities/Dimension/LinearDimension';
import { AngularDimLines, DLine } from './Entities/Dimension/AngularDimLines';
import { DimensionOptions } from './Entities/Dimension/Dimension';
import { AngularDimPoints } from './Entities/Dimension/AngularDimPoints';
import { Line } from './Entities/Line';
import { Point } from './Entities/Point';
import { Circle } from './Entities/Circle';
import { Arc } from './Entities/Arc';
import { Spline, SplineArgs_t } from './Entities/Spline';
import { Ellipse } from './Entities/Ellipse';
import { Face, faceOptions_t } from './Entities/Face';
import { Text, TextOptions } from './Entities/Text';
import { 
	Leader,
	LeaderVertex,
	LeaderOptions,
} from './Entities/Leader';

export default abstract class EntitiesManager implements DxfInterface {
	readonly entities: Entity[] = [];
	readonly handle: string;
	private readonly objects: DxfObjectsSection;
	layerName: string;

	constructor(objects: DxfObjectsSection, layerName: string) {
		this.handle = Handle.next();
		this.objects = objects;
		this.layerName = layerName;
	}

	dxfy(dx: Dxfier): void {
		for (const entity of this.entities) {
			entity.dxfy(dx);
		}
	}

	addHatch(
		boundaryPath: HatchBoundaryPaths,
		fill: HatchPatternOptions_t | HatchGradientOptions_t,
		options?: HatchOptions_t
	) {
		const hatch = new Hatch(boundaryPath, fill, options);
		return this.addEntity(hatch);
	}

	addEntity<T extends Entity>(entity: T): T {
		entity.ownerBlockRecord = this.handle;
		if (entity.layerName == null) entity.layerName = this.layerName;
		this.entities.push(entity);
		return entity;
	}

	addAlignedDim(first: vec3_t, second: vec3_t, options?: AlignedDimOptions) {
		return this.addEntity(new AlignedDimension(first, second, options));
	}

	addDiameterDim(first: vec3_t, second: vec3_t, options?: DiameterDimOptions) {
		return this.addEntity(new DiameterDimension(first, second, options));
	}

	addRadialDim(first: vec3_t, second: vec3_t, options?: RadialDimOptions) {
		return this.addEntity(new RadialDimension(first, second, options));
	}

	addLinearDim(first: vec3_t, second: vec3_t, options?: LinearDimOptions) {
		return this.addEntity(new LinearDimension(first, second, options));
	}

	addAngularLinesDim(
		first: DLine,
		second: DLine,
		location: vec3_t,
		options?: DimensionOptions
	): AngularDimLines {
		return this.addEntity(new AngularDimLines(first, second, location, options));
	}

	addAngularPointsDim(
		center: vec3_t,
		first: vec3_t,
		second: vec3_t,
		options?: DimensionOptions
	): AngularDimPoints {
		return this.addEntity(new AngularDimPoints(center, first, second, options));
	}

	addLine(startPoint: vec3_t, endPoint: vec3_t, options?: CommonEntityOptions): Line {
		return this.addEntity(new Line(startPoint, endPoint, options));
	}

	addLeader(points: LeaderVertex[], options?: LeaderOptions): Leader {
		return this.addEntity(new Leader(points, options));
	}

	addLWPolyline(points: LWPolylineVertex[], options?: LWPolylineOptions): LWPolyline {
		return this.addEntity(new LWPolyline(points, options));
	}

	addRectangle(topLeft: vec2_t, bottomRight: vec2_t, options?: rectangleOptions_t): LWPolyline {
		const vertices: LWPolylineVertex[] = [];
		const tX = topLeft.x;
		const tY = topLeft.y;
		const bX = bottomRight.x;
		const bY = bottomRight.y;

		if (options?.fillet !== undefined && options?.chamfer !== undefined)
			throw new Error('You cannot define both fillet and chamfer!');

		if (options?.fillet !== undefined) {
			const f = options?.fillet;
			const b = bulge(f);
			vertices.push({ point: point2d(tX, tY - f), bulge: b });
			vertices.push({ point: point2d(tX + f, tY) });
			vertices.push({ point: point2d(bX - f, tY), bulge: b });
			vertices.push({ point: point2d(bX, tY - f) });
			vertices.push({ point: point2d(bX, bY + f), bulge: b });
			vertices.push({ point: point2d(bX - f, bY) });
			vertices.push({ point: point2d(tX + f, bY), bulge: b });
			vertices.push({ point: point2d(tX, bY + f) });
		} else if (options?.chamfer !== undefined) {
			const f = options?.chamfer.first;
			const s: number = options?.chamfer.second || f;
			vertices.push({ point: point2d(tX, tY - f) });
			vertices.push({ point: point2d(tX + s, tY) });
			vertices.push({ point: point2d(bX - f, tY) });
			vertices.push({ point: point2d(bX, tY - s) });
			vertices.push({ point: point2d(bX, bY + f) });
			vertices.push({ point: point2d(bX - s, bY) });
			vertices.push({ point: point2d(tX + f, bY) });
			vertices.push({ point: point2d(tX, bY + s) });
		} else {
			vertices.push({ point: point2d(tX, tY) });
			vertices.push({ point: point2d(bX, tY) });
			vertices.push({ point: point2d(bX, bY) });
			vertices.push({ point: point2d(tX, bY) });
		}

		return this.addLWPolyline(vertices, {
			...options,
			flags: LWPolylineFlags.Closed,
		});
	}

	addImage(
		imagePath: string,
		name: string,
		insertionPoint: vec3_t,
		width: number,
		height: number,
		scale: number,
		rotation: number,
		options?: ImageOptions_t
	): Image {
		// TODO make sure there is no IMAGEDEF for this image!
		const imageDef = this.objects.addImageDef(imagePath);
		imageDef.width = width;
		imageDef.height = height;
		const image = new Image(
			{
				height,
				width,
				scale,
				rotation,
				insertionPoint,
				imageDefHandle: imageDef.handle,
			},
			options
		);
		const imageDefReactor = this.objects.addImageDefReactor(image.handle);
		image.imageDefReactorHandle = imageDefReactor.handle;
		this.addEntity(image);
		const dictionary = this.objects.addDictionary();

		dictionary.addEntryObject(name, imageDef.handle);
		imageDef.ownerObjecthandle = dictionary.handle;
		this.objects.root.addEntryObject('ACAD_IMAGE_DICT', dictionary.handle);
		imageDef.acadImageDictHandle = dictionary.handle;
		imageDef.addImageDefReactorHandle(imageDefReactor.handle);
		return image;
	}

	addPolyline3D(vertices: PolylineVertex[], options?: PolylineOptions): Polyline {
		return this.addEntity(new Polyline(vertices, options));
	}

	addPoint(x: number, y: number, z: number, options?: CommonEntityOptions): Point {
		return this.addEntity(new Point(x, y, z, options));
	}

	addCircle(center: vec3_t, radius: number, options?: CommonEntityOptions): Circle {
		return this.addEntity(new Circle(center, radius, options));
	}

	addArc(
		center: vec3_t,
		radius: number,
		startAngle: number,
		endAngle: number,
		options?: CommonEntityOptions
	): Arc {
		return this.addEntity(new Arc(center, radius, startAngle, endAngle, options));
	}

	addSpline(splineArgs: SplineArgs_t, options?: CommonEntityOptions): Spline {
		return this.addEntity(new Spline(splineArgs, options));
	}

	addEllipse(
		center: vec3_t,
		endPointOfMajorAxis: vec3_t,
		ratioOfMinorAxisToMajorAxis: number,
		startParameter: number,
		endParameter: number,
		options?: CommonEntityOptions
	): Ellipse {
		const ellipse = new Ellipse(
			center,
			endPointOfMajorAxis,
			ratioOfMinorAxisToMajorAxis,
			startParameter,
			endParameter,
			options
		);
		this.addEntity(ellipse);
		return ellipse;
	}

	add3dFace(
		firstCorner: vec3_t,
		secondCorner: vec3_t,
		thirdCorner: vec3_t,
		fourthCorner: vec3_t,
		options?: faceOptions_t
	): Face {
		return this.addEntity(
			new Face(firstCorner, secondCorner, thirdCorner, fourthCorner, options)
		);
	}

	addText(
		firstAlignementPoint: vec3_t,
		height: number,
		value: string,
		options?: TextOptions
	): Text {
		return this.addEntity(new Text(firstAlignementPoint, height, value, options));
	}

	addInsert(blockName: string, insertionPoint: vec3_t, options?: insertOptions_t): Insert {
		return this.addEntity(new Insert(blockName, insertionPoint, options || {}));
	}

	boundingBox(): boundingBox_t {
		const _bboxes = [];
		for (let i = 0; i < this.entities.length; i++) _bboxes.push(this.entities[i].boundingBox());
		return BoundingBox.boundingBox(_bboxes);
	}

	centerView(): vec3_t {
		return BoundingBox.boundingBoxCenter(this.boundingBox());
	}

	viewHeight(): number {
		return BoundingBox.boundingBoxHeight(this.boundingBox());
	}
}
