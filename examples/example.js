import DXFWriter from "../lib/DXFWriter";
import * as fs from 'fs';

const dxf = new DXFWriter();
dxf.addLine(0, 0, 100, 100);
let points = [
    [-200, 0, 0],
    [0, 200, 0],
    [300, 70, 0]
];
dxf.addLineType('DOT', '. . . . . . . . . . . . . . . . . .', [0,-4])
    .addLineType('ACAD_ISO11W100', '__ __ . __ __ . __ __ .', [4, -2, 4, -2, 0, -2])
    .addLineType('DOT2', '.................................', [0,-2])
    .addLineType('DASHED', '_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _', [4,-4]);

dxf.addLayer('l_red',       DXFWriter.colors.Red,       'DASHED')
    .addLayer('l_green',    DXFWriter.colors.Green,     'CONTINUOUS')
    .addLayer('l_cyan',     DXFWriter.colors.Cyan,      'CONTINUOUS')
    .addLayer('l_yellow',   DXFWriter.colors.Yellow,    'ACAD_ISO11W100');

dxf.setCurrentLayer('l_green')
    .addSpline(points, points, 3, 8, [], [])
    .setCurrentLayer('l_red')
    .addCircle(60, 150, 50)
    .addRectangle(20, 20,100, 100)
    .setCurrentLayer('l_cyan')
    .addText(30, 30, 10, "Hello World")
    .addPolyline3D([
        [70, 70, 50],
        [150, 70, 0],
        [170, 170, 150]
    ], 0)
    .addArc(0, 0, 120, 0, 120)
    .addPoint(65, -30, 0)
    .setCurrentLayer('l_yellow')
    .addEllipse(100, 50, 300, 400, 0.5, 0, 2 * Math.PI)
    .add3DFace(
        0, 0, 10,
        20, 0, 10,
        20, -20, 20,
        0, -20, 20);
fs.writeFileSync('examples/example.dxf', dxf.stringify());
