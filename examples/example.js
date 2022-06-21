const dxf = require('../lib');
const fs = require('fs');

const doc = new dxf.DxfWriter();
doc.addLine(dxf.point3d(0, 0, 0), dxf.point3d(100, 100, 100));

fs.writeFileSync('examples/example.dxf', doc.stringify());
