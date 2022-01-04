import DxfManager from './DxfManager';
import * as fs from 'fs';

const d = new DxfManager();

fs.writeFileSync('examples/latest.dxf', d.stringify());
