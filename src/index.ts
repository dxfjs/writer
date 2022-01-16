/**
 * The public interface of the Dxf API.
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
} from './Functions';
import {
	RecordFlags,
	LayerFlags,
	StyleFlags,
	ViewFlags,
} from './Sections/TablesSection/Tables/Records/DxfRecord';

export {
	DxfWriter as default,
	point3d,
	point2d,
	point2d_t,
	point3d_t,
	options_t,
	values_t,
	addBlock,
	addAppId,
	addBlockRecord,
	addDimStyle,
	addLineType,
	addLayer,
	Colors,
	Units,
	RecordFlags,
	LayerFlags,
	StyleFlags,
	ViewFlags,
};
