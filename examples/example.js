import DxfWriter, { point3d } from '../lib';
import * as fs from 'fs';

const dxf = new DxfWriter();

dxf.addLine(point3d(0, 0, 0), point3d(100, 100, 0), {});

fs.writeFileSync('examples/example.dxf', dxf.stringify());
