import DxfManager from './DxfManager';
import {
	HatchBoundaryPath,
	HatchGradientOptions_t,
	HatchOptions_t,
	HatchPatternOptions_t,
} from './Sections/EntitiesSection/Entities/Hatch';
import { point3d_t } from './Internals/TagsManager';
import DxfBlock from './Sections/BlocksSection/DxfBlock';
import DxfBlocksSection from './Sections/BlocksSection/DxfBlocksSection';
import DxfEntitiesSection from './Sections/EntitiesSection/DxfEntitiesSection';
import Arc from './Sections/EntitiesSection/Entities/Arc';
import Circle from './Sections/EntitiesSection/Entities/Circle';
import Face, { faceOptions_t } from './Sections/EntitiesSection/Entities/Face';
import { ImageOptions_t } from './Sections/EntitiesSection/Entities/Image';
import Insert, {
	insertOptions_t,
} from './Sections/EntitiesSection/Entities/Insert';
import Line from './Sections/EntitiesSection/Entities/Line';
import LWPolyline, {
	lwPolylineOptions_t,
	lwPolylineVertex_t,
} from './Sections/EntitiesSection/Entities/LWPolyline';
import { options_t } from './Sections/EntitiesSection/Entity';
import DxfObject from './Sections/ObjectsSection/DxfObject';
import DxfObjects from './Sections/ObjectsSection/DxfObjectsSection';
import DxfDictionary from './Sections/ObjectsSection/Objects/DxfDictionary';
import DxfImageDef from './Sections/ObjectsSection/Objects/DxfImageDef';
import DxfImageDefReactor from './Sections/ObjectsSection/Objects/DxfImageDefReactor';
import DxfTablesSection from './Sections/TablesSection/DxfTablesSection';
import DxfAppId from './Sections/TablesSection/Tables/Records/DxfAppId';
import DxfBlockRecord from './Sections/TablesSection/Tables/Records/DxfBlockRecord';
import DxfDimStyle from './Sections/TablesSection/Tables/Records/DxfDimStyle';
import DxfLayer from './Sections/TablesSection/Tables/Records/DxfLayer';
import DxfLineType from './Sections/TablesSection/Tables/Records/DxfLineType';
import DxfStyle from './Sections/TablesSection/Tables/Records/DxfStyle';

//#region Tables
/**
 * @public
 * @param name -
 * @returns
 */
export function addBlock(name: string): DxfBlock {
	return DxfBlocksSection.getInstance().addBlock(name);
}

/**
 * @public
 * @param name -
 * @param flags -
 * @returns
 */
export function addAppId(name: string, flags?: number): DxfAppId {
	return DxfTablesSection.getInstance().addAppId(name, flags);
}

/**
 * @public
 * @param name -
 * @returns
 */
export function addBlockRecord(name: string): DxfBlockRecord {
	return DxfTablesSection.getInstance().addBlockRecord(name);
}

/**
 * @public
 * @param name -
 * @param flags -
 * @returns
 */
export function addDimStyle(name: string, flags?: number): DxfDimStyle {
	return DxfTablesSection.getInstance().addDimStyle(name, flags);
}

/**
 * @public
 * @param name -
 * @param descriptive -
 * @param elements -
 * @param flags -
 * @returns
 */
export function addLineType(
	name: string,
	descriptive: string,
	elements: number[],
	flags?: number
): DxfLineType {
	return DxfTablesSection.getInstance().addLineType(
		name,
		descriptive,
		elements,
		flags
	);
}

/**
 * @public
 * @param name -
 * @param color -
 * @param lineType -
 * @param flags -
 * @returns
 */
export function addLayer(
	name: string,
	color: number,
	lineType: string,
	flags?: number
): DxfLayer {
	return DxfTablesSection.getInstance().addLayer(
		name,
		color,
		lineType,
		flags
	);
}

/**
 * @public
 * @param name - Tha name of style.
 * @returns
 */
export function addStyle(name: string): DxfStyle {
	return DxfTablesSection.getInstance().addStyle(name);
}
//#endregion

//#region Entities
/**
 *
 * @public
 *
 * @param center -
 * @param radius -
 * @param startAngle -
 * @param endAngle -
 * @param options -
 * @returns
 */
export function addArc(
	center: point3d_t,
	radius: number,
	startAngle: number,
	endAngle: number,
	options?: options_t
): Arc {
	return DxfEntitiesSection.getInstance().modelSpace.addArc(
		center,
		radius,
		startAngle,
		endAngle,
		options
	);
}

/**
 *
 * @param center
 * @param radius
 * @param options
 * @returns
 */
export function addCircle(
	center: point3d_t,
	radius: number,
	options?: options_t
): Circle {
	return DxfEntitiesSection.getInstance().modelSpace.addCircle(
		center,
		radius,
		options
	);
}

/**
 *
 * @param center
 * @param endPointOfMajorAxis
 * @param ratioOfMinorAxisToMajorAxis
 * @param startParameter
 * @param endParameter
 * @param options
 * @returns
 */
export function addEllipse(
	center: point3d_t,
	endPointOfMajorAxis: point3d_t,
	ratioOfMinorAxisToMajorAxis: number,
	startParameter: number,
	endParameter: number,
	options?: options_t
) {
	return DxfEntitiesSection.getInstance().modelSpace.addEllipse(
		center,
		endPointOfMajorAxis,
		ratioOfMinorAxisToMajorAxis,
		startParameter,
		endParameter,
		options
	);
}

/**
 *
 * @param firstCorner
 * @param secondCorner
 * @param thirdCorner
 * @param fourthCorner
 * @param options
 * @returns
 */
export function add3dFace(
	firstCorner: point3d_t,
	secondCorner: point3d_t,
	thirdCorner: point3d_t,
	fourthCorner: point3d_t,
	options?: faceOptions_t
): Face {
	return DxfEntitiesSection.getInstance().modelSpace.add3dFace(
		firstCorner,
		secondCorner,
		thirdCorner,
		fourthCorner,
		options
	);
}

/**
 *
 * @param absolutePath
 * @param name
 * @param insertionPoint
 * @param width
 * @param height
 * @param scale
 * @param rotation
 * @param options
 * @returns
 */
export function addImage(
	absolutePath: string,
	name: string,
	insertionPoint: point3d_t,
	width: number,
	height: number,
	scale: number,
	rotation: number,
	options?: ImageOptions_t
) {
	return DxfManager.getInstance().addImage(
		absolutePath,
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
 * Add an insert entity to the Dxf.
 * @public
 * @param blockName - The name of the block to insert.
 * @param insertionPoint - The point where the block is to be inserted.
 * @param options - The options of the Insert entity.
 * @returns Return a reference to the added Insert entity.
 */
export function addInsert(
	blockName: string,
	insertionPoint: point3d_t,
	options?: insertOptions_t
): Insert {
	return DxfEntitiesSection.getInstance().modelSpace.addInsert(
		blockName,
		insertionPoint,
		options
	);
}

/**
 *
 * @param startPoint
 * @param endPoint
 * @param options
 * @returns
 */
export function addLine(
	startPoint: point3d_t,
	endPoint: point3d_t,
	options?: options_t
): Line {
	return DxfEntitiesSection.getInstance().modelSpace.addLine(
		startPoint,
		endPoint,
		options
	);
}

/**
 *
 * @param points
 * @param options
 * @returns
 */
export function addLWPolyline(
	points: lwPolylineVertex_t[],
	options: lwPolylineOptions_t = {}
): LWPolyline {
	return DxfEntitiesSection.getInstance().modelSpace.addLWPolyline(
		points,
		options
	);
}

/**
 *
 * @param boundaryPath
 * @param fill
 * @param options
 * @returns
 */
export function addHatch(
	boundaryPath: HatchBoundaryPath,
	fill: HatchPatternOptions_t | HatchGradientOptions_t,
	options?: HatchOptions_t
) {
	return DxfEntitiesSection.getInstance().modelSpace.addHatch(
		boundaryPath,
		fill,
		options
	);
}

//#endregion

//#region Objects

/**
 * Add an object to objects section.
 * @public
 * @param object
 * @returns
 */
export function addObject<T extends DxfObject>(object: T): T {
	return DxfObjects.getInstance().addObject(object);
}

/**
 * @public
 * @returns
 */
export function addDictionary(): DxfDictionary {
	return DxfObjects.getInstance().addDictionary();
}

/**
 * @public
 * @param name
 * @param softOwner
 */
export function addEntryToRootDictionary(
	name: string,
	softOwner: string
): void {
	DxfObjects.getInstance().rootDictionary.addEntryObject(name, softOwner);
}

/**
 * @public
 * @param path
 * @returns
 */
export function addImageDef(path: string): DxfImageDef {
	return addObject(new DxfImageDef(path));
}

/**
 * @public
 * @param dictionaryId
 * @returns
 */
export function addImageDefReactor(dictionaryId: string) {
	return addObject(new DxfImageDefReactor(dictionaryId));
}

//#endregion
