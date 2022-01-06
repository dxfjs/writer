import DxfManager from './DxfManager';
import * as fs from 'fs';
import { createPoint3d } from './Internals/TagsManager';

const d = new DxfManager();

d.addImage(
	'E:/GitHub/dxf/examples/X_310168.70_Y_163789.62_S_388.28.png',
	createPoint3d(10, 10, 10),
	1536,
	1280,
	1
);

fs.writeFileSync('examples/latest.dxf', d.stringify());
