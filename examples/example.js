const { DxfWriter, Colors, point3d } = require('../dist');
const { writeFileSync } = require('fs');

const dxf = new DxfWriter();
dxf.addLayer('green', Colors.Green, 'Continuous');
dxf.addLayer('blue', Colors.Blue, 'Continuous');
dxf.setCurrentLayerName('green');
dxf.addLine(point3d(0, 0, 0), point3d(100, 100, 100));
dxf.addLine(point3d(100, 0, 0), point3d(200, 100, 0), {
	colorNumber: Colors.Cyan,
});
writeFileSync('examples/example.dxf', dxf.stringify());
