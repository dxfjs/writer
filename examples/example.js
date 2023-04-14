const { DxfWriter, point3d, Colors} = require('../lib');
const { writeFileSync } = require('fs');

const dxf = new DxfWriter();
const layerTest = dxf.addLayer('test', Colors.Blue)

const appIdTest = dxf.tables.addAppId("TEST_APPID")
const line = dxf.addLine(point3d(), point3d(100, 100));

const xdataTest = line.addXData(appIdTest.name)
xdataTest.string('Test string')
xdataTest.layerName(layerTest.name)
xdataTest.databaseHandle('1A16235')

const _str = dxf.stringify();
writeFileSync('examples/example.dxf', _str);
