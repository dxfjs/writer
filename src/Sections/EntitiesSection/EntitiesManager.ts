import Entity, { options_t } from './Entity';
import TagsManager, {
	point2d,
	point2d_t,
	point3d_t,
} from '../../Internals/TagsManager';
import DxfInterface from '../../Internals/Interfaces/DxfInterface';
import BoundingBox, { boundingBox_t } from '../../Internals/BoundingBox';
import Line from './Entities/Line';
import LWPolyline, {
	LWPolylineFlags,
	lwPolylineOptions_t,
	lwPolylineVertex_t,
} from './Entities/LWPolyline';
import { bulge, rectangleOptions_t } from '../../Internals/Utils';
import Polyline, { polylineOptions_t } from './Entities/Polyline';
import Point from './Entities/Point';
import Circle from './Entities/Circle';
import Spline, { SplineArgs_t } from './Entities/Spline';
import Ellipse from './Entities/Ellipse';
import Face, { faceOptions_t } from './Entities/Face';
import Text from './Entities/Text';
import Arc from './Entities/Arc';
import Handle from '../../Internals/Handle';
import Insert, { insertOptions_t } from './Entities/Insert';
import Hatch, {
	HatchBoundaryPath,
	HatchGradientOptions_t,
	HatchOptions_t,
	HatchPatternOptions_t,
} from './Entities/Hatch';

export default abstract class EntitiesManager implements DxfInterface {
	readonly entities: Entity[] = [];
	readonly handle: string;

	constructor() {
		this.handle = Handle.next();
	}

	addHatch(
		boundaryPath: HatchBoundaryPath,
		fill: HatchPatternOptions_t | HatchGradientOptions_t,
		options?: HatchOptions_t
	) {
		const hatch = new Hatch(boundaryPath, fill, options);
		return this.addEntity(hatch);
	}

	addEntity<T extends Entity>(entity: T): T {
		entity.ownerBlockRecord = this.handle;
		this.entities.push(entity);
		return entity;
	}

	addLine(
		startPoint: point3d_t,
		endPoint: point3d_t,
		options?: options_t
	): Line {
		return this.addEntity(new Line(startPoint, endPoint, options));
	}

	addLWPolyline(points: lwPolylineVertex_t[], options: lwPolylineOptions_t) {
		return this.addEntity(new LWPolyline(points, options));
	}

	addRectangle(
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
			vertices.push({ point: point2d(tX, tY - f), bulge: b });
			vertices.push({ point: point2d(tX + f, tY) });
			vertices.push({ point: point2d(bX - f, tY), bulge: b });
			vertices.push({ point: point2d(bX, tY - f) });
			vertices.push({ point: point2d(bX, bY + f), bulge: b });
			vertices.push({ point: point2d(bX - f, bY) });
			vertices.push({ point: point2d(tX + f, bY), bulge: b });
			vertices.push({ point: point2d(tX, bY + f) });
		} else if (options.chamfer !== undefined) {
			const f = options.chamfer.first;
			const s: number = options.chamfer.second || f;
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

	addPolyline3D(
		points: (point3d_t | point2d_t)[],
		options?: polylineOptions_t
	): void {
		this.addEntity(new Polyline(points, options));
	}

	addPoint(x: number, y: number, z: number, options?: options_t): Point {
		return this.addEntity(new Point(x, y, z, options));
	}

	addCircle(center: point3d_t, radius: number, options?: options_t): Circle {
		return this.addEntity(new Circle(center, radius, options));
	}

	addArc(
		center: point3d_t,
		radius: number,
		startAngle: number,
		endAngle: number,
		options?: options_t
	): Arc {
		return this.addEntity(
			new Arc(center, radius, startAngle, endAngle, options)
		);
	}

	addSpline(splineArgs: SplineArgs_t, options?: options_t): Spline {
		return this.addEntity(new Spline(splineArgs, options));
	}

	addEllipse(
		center: point3d_t,
		endPointOfMajorAxis: point3d_t,
		ratioOfMinorAxisToMajorAxis: number,
		startParameter: number,
		endParameter: number,
		options?: options_t
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
		firstCorner: point3d_t,
		secondCorner: point3d_t,
		thirdCorner: point3d_t,
		fourthCorner: point3d_t,
		options?: faceOptions_t
	): Face {
		return this.addEntity(
			new Face(
				firstCorner,
				secondCorner,
				thirdCorner,
				fourthCorner,
				options
			)
		);
	}

	addText(
		firstAlignementPoint: point3d_t,
		height: number,
		value: string,
		options?: options_t
	): Text {
		return this.addEntity(
			new Text(firstAlignementPoint, height, value, options)
		);
	}

	addInsert(
		blockName: string,
		insertionPoint: point3d_t,
		options?: insertOptions_t
	): Insert {
		return this.addEntity(
			new Insert(blockName, insertionPoint, options || {})
		);
	}

	boundingBox(): boundingBox_t {
		return BoundingBox.boundingBox(
			this.entities.map((enity) => enity.boundingBox())
		);
	}

	centerView(): point3d_t {
		return BoundingBox.boundingBoxCenter(this.boundingBox());
	}

	viewHeight(): number {
		return BoundingBox.boundingBoxHeight(this.boundingBox());
	}

	get manager(): TagsManager {
		const manager = new TagsManager();
		this.entities.forEach((entity) => {
			manager.append(entity);
		});
		return manager;
	}

	stringify(): string {
		return this.manager.stringify();
	}
}
