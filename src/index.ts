// Licensed under the MIT license.

/**
 * A library for generating ```dxf``` files.
 *
 * @packageDocumentation
 */
import DxfWriter from './DxfWriter';
import { values_t } from './Sections/HeaderSection/DxfVariable';
import {
	point2d,
	point3d,
	point2d_t,
	point3d_t,
} from './Internals/TagsManager';
import { options_t } from './Sections/EntitiesSection/Entity';
import { Colors, Units } from './GlobalState';
import {
	addBlock,
	addAppId,
	addBlockRecord,
	addLineType,
	addLayer,
	addDimStyle,
	addArc,
	addDictionary,
	addObject,
	addEntryToRootDictionary,
	addImageDef,
	addImageDefReactor,
	addStyle,
} from './Functions';
import {
	RecordFlags,
	LayerFlags,
	StyleFlags,
	ViewFlags,
} from './Sections/TablesSection/Tables/Records/DxfRecord';

import {
	LWPolylineFlags,
	lwPolylineOptions_t,
	lwPolylineVertex_t,
} from './Sections/EntitiesSection/Entities/LWPolyline';
import { rectangleOptions_t } from './Internals/Utils';
import { SplineArgs } from './Sections/EntitiesSection/Entities/Spline';
import DxfBlock from './Sections/BlocksSection/DxfBlock';
import DxfAppId from './Sections/TablesSection/Tables/Records/DxfAppId';
import DxfBlockRecord from './Sections/TablesSection/Tables/Records/DxfBlockRecord';
import DxfDimStyle from './Sections/TablesSection/Tables/Records/DxfDimStyle';
import DxfLineType from './Sections/TablesSection/Tables/Records/DxfLineType';
import DxfLayer from './Sections/TablesSection/Tables/Records/DxfLayer';
import { ImageDefResolutionUnits } from './Sections/ObjectsSection/Objects/DxfImageDef';

export {
	DxfWriter as default,
	point3d,
	point2d,
	point2d_t,
	point3d_t,
	options_t,
	values_t,
	lwPolylineOptions_t,
	lwPolylineVertex_t,
	rectangleOptions_t,
	addBlock,
	DxfBlock,
	addAppId,
	DxfAppId,
	addBlockRecord,
	DxfBlockRecord,
	addDimStyle,
	DxfDimStyle,
	addLineType,
	DxfLineType,
	addLayer,
	DxfLayer,
	Colors,
	Units,
	ImageDefResolutionUnits,
	RecordFlags,
	LayerFlags,
	StyleFlags,
	ViewFlags,
	LWPolylineFlags,
	SplineArgs,
	addArc,
	addDictionary,
	addObject,
	addEntryToRootDictionary,
	addImageDef,
	addImageDefReactor,
	addStyle,
};
