import DxfWriter from './DxfWriter';
import { values_t } from './Sections/Header/DxfVariable';
import {
	point2d,
	point3d,
	tag,
	tag_t,
	point2d_t,
	point3d_t,
} from './Internals/TagsManager';

export { values_t, point3d, point2d, tag, tag_t, point2d_t, point3d_t };
export default DxfWriter;
