const { DxfWriter, Colors, point3d } = require('../dist');
const { writeFileSync } = require('fs');

const d = new DxfWriter();
const green = d.addLayer('green', Colors.Green, 'Continuous');
const blue = d.addLayer('blue', Colors.Blue, 'Continuous');
d.setCurrentLayerName(green.name);
d.addLine(point3d(0, 0, 0), point3d(100, 100, 100));
d.addLine(point3d(100, 0, 0), point3d(200, 100, 0), {
	colorNumber: Colors.Cyan,
});
d.setCurrentLayerName(blue.name);
d.addCircle(point3d(150, 100, 0), 50);
const _str = d.stringify();
writeFileSync('examples/example.dxf', _str);
