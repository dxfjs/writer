import Entity, { options_t } from './Entity';
import Arc from './Entities/Arc';
import Line from './Entities/Line';
import Face from './Entities/Face';
import Text from './Entities/Text';
import Point from './Entities/Point';
import Circle from './Entities/Circle';
import Spline from './Entities/Spline';
import Ellipse from './Entities/Ellipse';
import Polyline from './Entities/LWPolyline';
import Polyline3D from './Entities/Polyline';
import TagsManager, { point2d_t, point3d_t } from '../../Internals/TagsManager';
import DxfInterface from '../../Internals/Interfaces/DxfInterface';
import BoundingBox, { boundingBox_t } from '../../Internals/BoundingBox';

export default class Entities implements DxfInterface {
	private _entities: Entity[] = [];

	public constructor() {}

	public addEntity(entity: Entity) {
		this._entities.push(entity);
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

	public addPolyline(points: point2d_t[], flag: number, options: options_t) {
		this.addEntity(new Polyline(points, flag, options));
	}

	public addPolyline3D(
		points: point3d_t[],
		flag: number,
		options: options_t
	) {
		this.addEntity(new Polyline3D(points, flag, options));
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

	public get entities(): Entity[] {
		return this._entities;
	}

	public get manager(): TagsManager {
		const manager = new TagsManager();
		manager.sectionBegin('ENTITIES');
		this.entities.forEach((entity) => {
			manager.appendTags(entity);
		});
		manager.sectionEnd();
		return manager;
	}

	public stringify(): string {
		return this.manager.stringify();
	}
}
