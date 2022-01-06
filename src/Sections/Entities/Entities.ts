import Entity, { PolylineFlags, SplineFlags } from './Entity';
import Arc from './Entities/Arc';
import Line from './Entities/Line';
import Face from './Entities/Face';
import Text from './Entities/Text';
import Point from './Entities/Point';
import Circle from './Entities/Circle';
import Spline from './Entities/Spline';
import Ellipse from './Entities/Ellipse';
import Polyline from './Entities/Polyline';
import Polyline3D from './Entities/Polyline3D';
import TagsManager from '../../Internals/TagsManager';
import DxfInterface from '../../Internals/Interfaces/DXFInterface';

export default class Entities implements DxfInterface {
	private _entities: Entity[] = [];

	public constructor() {}

	public addEntity(entity: Entity) {
		this._entities.push(entity);
	}

	public addLine(
		x_start: number,
		y_start: number,
		x_end: number,
		y_end: number
	) {
		this.addEntity(
			new Line(new Point(x_start, y_start), new Point(x_end, y_end))
		);
	}

	public addPolyline(
		points: number[][],
		flag: PolylineFlags = PolylineFlags.Default
	) {
		this.addEntity(new Polyline(points, flag));
	}

	public addPolyline3D(points: number[][], flag: number) {
		this.addEntity(new Polyline3D(points, flag));
	}

	public addPoint(x: number, y: number, z: number) {
		this.addEntity(new Point(x, y, z));
	}

	public addCircle(x_center: number, y_center: number, radius: number) {
		this.addEntity(new Circle(new Point(x_center, y_center), radius));
	}

	public addArc(
		x_center: number,
		y_center: number,
		radius: number,
		start_angle: number,
		end_angle: number
	) {
		this.addEntity(
			new Arc(
				new Point(x_center, y_center),
				radius,
				start_angle,
				end_angle
			)
		);
	}

	public addSpline(
		control_points: number[][],
		fit_points: number[][],
		curve_degree: number,
		flag: SplineFlags,
		knots: number[],
		weights: number[]
	) {
		this.addEntity(
			new Spline(
				control_points,
				fit_points,
				curve_degree,
				flag,
				knots,
				weights
			)
		);
	}

	public addEllipse(
		x_center: number,
		y_center: number,
		x_major_axis: number,
		y_major_axis: number,
		ratio_minor_axis: number,
		start_parameter: number,
		end_parameter: number
	) {
		this.addEntity(
			new Ellipse(
				new Point(x_center, y_center),
				x_major_axis,
				y_major_axis,
				ratio_minor_axis,
				start_parameter,
				end_parameter
			)
		);
	}

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
	) {
		this.addEntity(
			new Face(
				new Point(x_first, y_first, z_first),
				new Point(x_second, y_second, z_second),
				new Point(x_third, y_third, z_third),
				new Point(x_fourth, y_fourth, z_fourth)
			)
		);
	}

	public addText(x: number, y: number, height: number, value: string) {
		this.addEntity(new Text(new Point(x, y), height, value));
	}

	public boundingBox(): number[][] {
		const arrayX: number[] = [];
		const arrayY: number[] = [];

		this.entities.forEach((entity) => {
			const [[firstX, firstY], [secondX, secondY]] = entity.boundingBox();
			arrayX.push(firstX, secondX);
			arrayY.push(firstY, secondY);
		});
		const minX = Math.min(...arrayX);
		const maxX = Math.max(...arrayX);
		const minY = Math.min(...arrayY);
		const maxY = Math.max(...arrayY);

		return [
			[minX, maxY],
			[maxX, minY],
		];
	}

	public centerView(): [number, number] {
		const [[leftUpX, leftUpY], [rightBottomX, rightBottomY]] =
			this.boundingBox();
		const x = leftUpX + (rightBottomX - leftUpX) / 2;
		const y = rightBottomY + (leftUpY - rightBottomY) / 2;
		return [x, y];
	}

	public viewHeight(): number {
		const [[, leftUpY], [, rightBottomY]] = this.boundingBox();
		const r = leftUpY - rightBottomY;
		if (r === -Infinity) return 500;
		return r;
	}

	get entities(): Entity[] {
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
