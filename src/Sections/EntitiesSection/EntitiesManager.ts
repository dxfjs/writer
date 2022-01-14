import Entity, { options_t } from './Entity';
import TagsManager, { point2d_t, point3d_t } from '../../Internals/TagsManager';
import DxfInterface from '../../Internals/Interfaces/DxfInterface';
import BoundingBox, { boundingBox_t } from '../../Internals/BoundingBox';
import Line from './Entities/Line';
import LWPolyline, {
	lwPolylineFlags,
	lwPolylineOptions_t,
	lwPolylineVertex_t,
} from './Entities/LWPolyline';
import { bulge, rectangleOptions_t } from '../../Internals/Utils';
import Polyline from './Entities/Polyline';
import Point from './Entities/Point';
import Circle from './Entities/Circle';
import Spline from './Entities/Spline';
import Ellipse from './Entities/Ellipse';
import Face from './Entities/Face';
import Text from './Entities/Text';
import Arc from './Entities/Arc';
import Handle from '../../Internals/Handle';
import Insert from './Entities/Insert';

export default abstract class EntitiesManager
	extends Handle
	implements DxfInterface
{
	private readonly _entities: Entity[] = [];

	public get entities(): Entity[] {
		return this._entities;
	}

	public constructor() {
		super();
	}

	public addEntity(entity: Entity) {
		entity.softPointer = this.softPointer;
		this.entities.push(entity);
	}

	public addLine(
		startPoint: point3d_t,
		endPoint: point3d_t,
		options: options_t
	): Line {
		const line = new Line(startPoint, endPoint, options);
		this.addEntity(line);
		return line;
	}

	public addLWPolyline(
		points: lwPolylineVertex_t[],
		options: lwPolylineOptions_t
	) {
		this.addEntity(new LWPolyline(points, options));
	}

	public addRectangle(
		topLeft: point2d_t,
		bottomRight: point2d_t,
		options: rectangleOptions_t = {}
	) {
		const vertices: lwPolylineVertex_t[] = [];
		const tX = topLeft.x;
		const tY = topLeft.y;
		const bX = bottomRight.x;
		const bY = bottomRight.y;

		if (options.fillet !== undefined && options.chamfer !== undefined)
			throw new Error('You cannot define both fillet and chamfer!');

		if (options.fillet !== undefined) {
			const f = options.fillet;
			const b = bulge(f);
			vertices.push({ x: tX, y: tY - f, bulge: b });
			vertices.push({ x: tX + f, y: tY });
			vertices.push({ x: bX - f, y: tY, bulge: b });
			vertices.push({ x: bX, y: tY - f });
			vertices.push({ x: bX, y: bY + f, bulge: b });
			vertices.push({ x: bX - f, y: bY });
			vertices.push({ x: tX + f, y: bY, bulge: b });
			vertices.push({ x: tX, y: bY + f });
		} else if (options.chamfer !== undefined) {
			const f = options.chamfer.first;
			const s: number = options.chamfer.second || f;
			vertices.push({ x: tX, y: tY - f });
			vertices.push({ x: tX + s, y: tY });
			vertices.push({ x: bX - f, y: tY });
			vertices.push({ x: bX, y: tY - s });
			vertices.push({ x: bX, y: bY + f });
			vertices.push({ x: bX - s, y: bY });
			vertices.push({ x: tX + f, y: bY });
			vertices.push({ x: tX, y: bY + s });
		} else {
			vertices.push({ x: tX, y: tY });
			vertices.push({ x: bX, y: tY });
			vertices.push({ x: bX, y: bY });
			vertices.push({ x: tX, y: bY });
		}

		this.addLWPolyline(vertices, {
			...options,
			flags: lwPolylineFlags.closed,
		});
	}

	public addPolyline3D(
		points: point3d_t[],
		flag: number,
		options: options_t
	) {
		this.addEntity(new Polyline(points, flag, options));
	}

	public addPoint(x: number, y: number, z: number, options: options_t) {
		this.addEntity(new Point(x, y, z, options));
	}

	public addCircle(center: point3d_t, radius: number, options: options_t) {
		this.addEntity(new Circle(center, radius, options));
	}

	public addArc(
		center: point3d_t,
		radius: number,
		startAngle: number,
		endAngle: number,
		options: options_t
	) {
		this.addEntity(new Arc(center, radius, startAngle, endAngle, options));
	}

	public addSpline(
		controlPoints: point3d_t[],
		fitPoints: point3d_t[],
		degreeCurve: number,
		flag: number,
		knots: number[],
		weights: number[],
		options: options_t
	) {
		this.addEntity(
			new Spline(
				controlPoints,
				fitPoints,
				degreeCurve,
				flag,
				knots,
				weights,
				options
			)
		);
	}

	public addEllipse(
		center: point3d_t,
		endPointOfMajorAxis: point3d_t,
		ratioOfMinorAxisToMajorAxis: number,
		startParameter: number,
		endParameter: number,
		options: options_t
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

	public add3dFace(
		firstCorner: point3d_t,
		secondCorner: point3d_t,
		thirdCorner: point3d_t,
		fourthCorner: point3d_t,
		options: options_t
	) {
		this.addEntity(
			new Face(
				firstCorner,
				secondCorner,
				thirdCorner,
				fourthCorner,
				options
			)
		);
	}

	public addText(
		firstAlignementPoint: point3d_t,
		height: number,
		value: string,
		options: options_t
	) {
		this.addEntity(new Text(firstAlignementPoint, height, value, options));
	}

	public addInsert(blockName: string, insertionPoint: point3d_t) {
		this.addEntity(new Insert(blockName, insertionPoint));
	}

	public boundingBox(): boundingBox_t {
		return BoundingBox.boundingBox(
			this.entities.map((enity) => enity.boundingBox())
		);
	}

	public centerView(): point3d_t {
		return BoundingBox.boundingBoxCenter(this.boundingBox());
	}

	public viewHeight(): number {
		return BoundingBox.boundingBoxHeight(this.boundingBox());
	}

	public get manager(): TagsManager {
		const manager = new TagsManager();
		this.entities.forEach((entity) => {
			manager.appendTags(entity);
		});
		return manager;
	}

	public stringify(): string {
		return this.manager.stringify();
	}
}
