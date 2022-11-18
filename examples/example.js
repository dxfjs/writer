const { DxfWriter, point2d, ArrowHeadFlag } = require('../dist');
const { writeFileSync } = require('fs');
const dxf = new DxfWriter();

const vertices = [
	{
		point: point2d(0, 0, 0),
	},
	{
		point: point2d(1, 1, 0),
	},
];
dxf.addLeader(vertices);

const _str = dxf.stringify();
writeFileSync('examples/example.dxf', _str);
