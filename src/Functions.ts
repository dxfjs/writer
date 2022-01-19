import { options_t, point3d_t } from './index';
import DxfBlock from './Sections/BlocksSection/DxfBlock';
import DxfBlocksSection from './Sections/BlocksSection/DxfBlocksSection';
import DxfEntitiesSection from './Sections/EntitiesSection/DxfEntitiesSection';
import Arc from './Sections/EntitiesSection/Entities/Arc';
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
