/**
 * The public interface of the Dxf API.
 *
 * @packageDocumentation
 * @module DxfWriter
 * @preferred
 */
import DxfWriter from './DxfWriter';
import { values_t } from './Sections/Header/DxfVariable';
import {
	point2d,
	point3d,
	point2d_t,
	point3d_t,
} from './Internals/TagsManager';
import { options_t } from './Sections/Entities/Entity';
import { Colors, Units } from './GlobalState';
import { Merge } from './Internals/Utils';

export {
	DxfWriter as default,
	values_t,
	point3d,
	point2d,
	point2d_t,
	point3d_t,
	options_t,
	Colors,
	Units,
	Merge,
};
