const { DxfWriter, point3d, Colors, Cell, CellAlignment} = require('../dist');
const { writeFileSync } = require('node:fs');

const dxf = new DxfWriter();
const paperSpace = dxf.document.paperSpace
const layerTest = dxf.addLayer('test', Colors.Blue)

const line = paperSpace.addLine(point3d(), point3d(100, 100));
line.layerName = layerTest.name;

const paperSpace0 = dxf.addPaperSpace();
// const l = paperSpace0.addLine(point3d(), point3d(100, 100));
// l.layerName = layerTest.name;

// dxf.addPaperSpace().addLine(point3d(), point3d(100, 100)); // paperSpace1
// dxf.addPaperSpace().addLine(point3d(), point3d(100, 100)); // paperSpace2/
// dxf.addPaperSpace(); // paperSpace3 (empty)/

paperSpace0.addTable('T1', point3d(0, 0, 0), 3, 3, [0.45, 0.36, 0.36], [2.5, 2.5, 2.5], {
    cell: [
        new Cell({
            cellText: 'title'
        }),
        new Cell({
            
        }),
        new Cell({

        }),
        new Cell({
            cellText: 'h1'
        }),
        new Cell({
            cellText: 'h2'
        }),
        new Cell({
            cellText: 'h3'
        }),
        new Cell({
            cellText: 't1',
            cellTextHeight: 0.6,
            attachment: CellAlignment.MiddleCenter,
        }),
        new Cell({
            cellText: 't2'
        }),
        new Cell({
            cellText: 't3'
        }),
    ]
});

const _str = dxf.stringify();
writeFileSync('examples/example.dxf', _str);
