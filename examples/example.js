const { DxfWriter, point3d, Colors} = require('../lib/index.cjs');
const { writeFileSync } = require('fs');

const dxf = new DxfWriter();
const paperSpace = dxf.document.paperSpace
const layerTest = dxf.addLayer('test', Colors.Blue)

const line = paperSpace.addLine(point3d(), point3d(100, 100));
line.layerName = layerTest.name;

const _str = dxf.stringify();
writeFileSync('examples/example.dxf', _str);
