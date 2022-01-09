import GlobalState from './GlobalState';
import Handle from './Internals/Handle';
import DxfInterface from './Internals/Interfaces/DxfInterface';
import TagsManager, { point2d_t, point3d_t } from './Internals/TagsManager';
import { bulge, rectangleOptions_t } from './Internals/Utils';
import DxfBlock from './Sections/BlocksSection/DxfBlock';
import DxfBlocks from './Sections/BlocksSection/DxfBlocks';
import DxfClasses from './Sections/Classes/DxfClasses';
import Entities from './Sections/Entities/Entities';
import Arc from './Sections/Entities/Entities/Arc';
import Circle from './Sections/Entities/Entities/Circle';
import Ellipse from './Sections/Entities/Entities/Ellipse';
import Face from './Sections/Entities/Entities/Face';
import Image from './Sections/Entities/Entities/Image';
import Line from './Sections/Entities/Entities/Line';
import LWPolyline, {
	lwPolylineFlags,
	lwPolylineOptions_t,
	lwPolylineVertex_t,
} from './Sections/Entities/Entities/LWPolyline';
import Point from './Sections/Entities/Entities/Point';
import Polyline from './Sections/Entities/Entities/Polyline';
import Spline from './Sections/Entities/Entities/Spline';
import Text from './Sections/Entities/Entities/Text';
import Entity, { options_t } from './Sections/Entities/Entity';
import DxfHeader from './Sections/Header/DxfHeader';
import DxfObjects from './Sections/Objects/DxfObjects';
import DxfImageDef from './Sections/Objects/Objects/DxfImageDef';
import DxfImageDefReactor from './Sections/Objects/Objects/DxfImageDefReactor';
import DxfTables from './Sections/Tables/DxfTables';
import DxfViewPort from './Sections/Tables/Tables/Records/DxfViewPort';

export default class DxfManager implements DxfInterface {
	private readonly _headerSection: DxfHeader;
	private readonly _classesSection: DxfClasses;
	private readonly _tablesSection: DxfTables;
	private readonly _blocksSection: DxfBlocks;
	private readonly _entitiesSection: Entities;
	private readonly _objectsSection: DxfObjects;

	private readonly _activeViewPort: DxfViewPort;

	private readonly _modelSpace: DxfBlock;
	private readonly _paperSpace: DxfBlock;

	public get modelSpace(): DxfBlock {
		return this._modelSpace;
	}

	public get paperSpace(): DxfBlock {
		return this._paperSpace;
	}

	public get headerSection(): DxfHeader {
		return this._headerSection;
	}

	public get classesSection(): DxfClasses {
		return this._classesSection;
	}

	public get tablesSection(): DxfTables {
		return this._tablesSection;
	}

	public get blocksSection(): DxfBlocks {
		return this._blocksSection;
	}

	public get entitiesSection(): Entities {
		return this._entitiesSection;
	}

	public get objectsSection(): DxfObjects {
		return this._objectsSection;
	}

	public constructor() {
		this._headerSection = new DxfHeader();
		this._classesSection = new DxfClasses();
		this._tablesSection = new DxfTables();
		this._blocksSection = new DxfBlocks();
		this._entitiesSection = new Entities();
		this._objectsSection = new DxfObjects();

		this.headerSection.setVariable('$ACADVER', { 1: 'AC1021' });
		this.updateHandleSeed();
		this.headerSection.setVariable('$INSUNITS', { 70: GlobalState.units });

		this.tablesSection.addLineType('ByBlock', '', []);
		this.tablesSection.addLineType('ByLayer', '', []);
		this.tablesSection.addLineType('Continuous', 'Solid line', []);
		this.tablesSection.addLayer('0', 7, 'Continuous');
		this.tablesSection.addStyle('Standard');
		this.tablesSection.addAppId('ACAD');
		this.tablesSection.addDimStyle('Standard');
		this._activeViewPort = this.tablesSection.addViewPort('*Active');

		const modelRecord = this.tablesSection.addBlockRecord('*Model_Space');
		const paperRecord = this.tablesSection.addBlockRecord('*Paper_Space');

		this._modelSpace = this.blocksSection.addBlock('*Model_Space');
		this._paperSpace = this.blocksSection.addBlock('*Paper_Space');
		this.modelSpace.softPointer = modelRecord.handle;
		this.modelSpace.endBlk.softPointer = modelRecord.handle;
		this.paperSpace.softPointer = paperRecord.handle;
		this.paperSpace.endBlk.softPointer = paperRecord.handle;
	}

	public setCurrentLayerName(name: string): void {
		const layerRecord = this.tablesSection.layerTable.layerRecords.find(
			(layer) => layer.name === name
		);
		if (layerRecord) GlobalState.currentLayerName = name;
		else throw new Error(`The '${name} layer doesn't exist!'`);
	}

	private updateHandleSeed() {
		this.headerSection.setVariable('$HANDSEED', { 5: Handle.nextHandle() });
	}

	public setUnits(units: number) {
		GlobalState.units = units;
		this.headerSection.setVariable('$INSUNITS', { 70: GlobalState.units });
	}

	public setViewCenter(center: point3d_t) {
		this.headerSection.setVariable('$VIEWCTR', {
			10: center.x,
			20: center.y,
		});
		this._activeViewPort.viewCenter = [center.x, center.y];
	}

	public addImage(
		absolutePath: string,
		name: string,
		insertionPoint: point3d_t,
		width: number,
		height: number,
		scale: number,
		rotation: number,
		options: options_t
	) {
		const imageDef = new DxfImageDef(absolutePath);
		const image = new Image(
			{
				height,
				width,
				scale,
				rotation,
				insertionPoint,
				imageDefId: imageDef.handle,
			},
			options
		);
		const imageDefReactor = new DxfImageDefReactor(image.handle);
		image.imageDefReactorId = imageDefReactor.handle;
		this.addEntity(image);
		this.objectsSection.addObject(imageDef);
		this.objectsSection.addObject(imageDefReactor);
		const dictionary = this.objectsSection.createDictionary();

		dictionary.addEntryObject(name, imageDef.handle);
		imageDef.softPointer = dictionary.handle;
		this.objectsSection.rootDictionary.addEntryObject(
			'ACAD_IMAGE_DICT',
			dictionary.handle
		);
		imageDef.acadImageDicId = dictionary.handle;
		imageDef.imageReactorId = imageDefReactor.handle;
	}

	public addEntity(entity: Entity) {
		entity.softPointer = this.modelSpace.handle;
		this.entitiesSection.entities.push(entity);
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
		options: rectangleOptions_t
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

	public stringify(): string {
		this.updateHandleSeed();
		this.setViewCenter(this.entitiesSection.centerView());
		this._activeViewPort.viewHeight = this.entitiesSection.viewHeight();
		return this.manager.stringify();
	}

	public get manager(): TagsManager {
		const manager = new TagsManager();
		manager.appendTags(this.headerSection);
		manager.appendTags(this.classesSection);
		manager.appendTags(this.tablesSection);
		manager.appendTags(this.blocksSection);
		manager.appendTags(this.entitiesSection);
		manager.appendTags(this.objectsSection);
		return manager;
	}
}
