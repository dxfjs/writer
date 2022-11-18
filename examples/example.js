const { DxfWriter, point3d } = require('../dist');
const { writeFileSync } = require('fs');
const d = new DxfWriter();
d.setVariable('$DIMTXT', { 40: 10 });
d.modelSpace.addRadialDim(point3d(0, 0, 0), point3d(100, 0, 0));
d.addAngularLinesDim(
	{
		start: point3d(200, 200),
		end: point3d(200, 300),
	},
	{
		start: point3d(300, 100),
		end: point3d(400, 200),
	},
	point3d(300, 300)
);
const _str = d.stringify();
writeFileSync('examples/example.dxf', _str);
