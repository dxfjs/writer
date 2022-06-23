const dxf = require('../lib');
const fs = require('fs');

const doc = new dxf.DxfWriter();
doc.addLayer('green', dxf.Colors.Green, 'Continuous');
doc.addLayer('blue', dxf.Colors.Blue, 'Continuous');
doc.setCurrentLayerName('green');
doc.addLine(dxf.point3d(0, 0, 0), dxf.point3d(100, 100, 100));
const l = doc.addLine(dxf.point3d(100, 0, 0), dxf.point3d(200, 100, 0), {
	colorNumber: dxf.Colors.Cyan,
});
fs.writeFileSync('examples/example.dxf', doc.stringify());
