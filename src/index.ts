/**
 * This is the public api for the Dxf library.
 *
 * Specify this is a module comment and rename it to DxfWriter:
 * @module DxfWriter
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

export { values_t, point3d, point2d, point2d_t, point3d_t, options_t };
export default DxfWriter;
