const { DxfWriter, point3d } = require('../dist');
const { writeFileSync } = require('fs');
const d = new DxfWriter();
d.setVariable('$DIMTXT', { 40: 10 });
d.modelSpace.addRadialDim(point3d(0, 0, 0), point3d(100, 0, 0));
const _str = d.stringify();
writeFileSync('examples/example.dxf', _str);
