
import * as fs from 'fs';
import DXFWriter from "../lib/DXFWriter";

const dxf = new DXFWriter();
dxf.addLine(0, 0, 100, 100);
let points = [
    [0, 0, 0],
    [0, 10, 0],
    [15, 15, 0],
    [30, 10, 0],
    [30, 0, 0]
];
dxf.addLineType('DOT', 'Dot . . . . . . . . . . . . . . . . . . . . . .', [0,-6.35])
    .addLineType('ACAD_ISO11W100', '__ __ . __ __ . __ __ . _', [12.0, -3.0, 12.0, -3.0, 0.0, -3.0])
    .addLineType('DOT2', 'Dot (.5x) .....................................', [0,-3.175])
    .addLineType('DASHED', 'Dashed _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _', [12.7,-6.35]);

dxf.addLayer('l_red', DXFWriter.colors.Red, 'DASHED')
    .addLayer('l_green', DXFWriter.colors.Green, 'CONTINUOUS')
    .addLayer('l_cyan', DXFWriter.colors.Cyan, 'CONTINUOUS')
    .addLayer('l_yellow', DXFWriter.colors.Yellow, 'ACAD_ISO11W100');

dxf.setCurrentLayer('l_green')
    .addSpline(points, 3, 0, [0, 0, 0, 0, 0.5, 2, 2, 2, 2], [], [])
    .setCurrentLayer('l_red')
    .addCircle(60, 150, 50)
    .addRectangle(20, 20,100, 100)
    .setCurrentLayer('l_cyan')
    .addText(30, 30, 5, "Hello World")
    .addPolyline3D([
        [70, 70, 50],
        [150, 70, 0],
        [170, 170, 150]
    ], 0)
    .addArc(0, 0, 120, 0, 120)
    .addPoint(65, -30, 0)
    .setCurrentLayer('l_yellow')
    .addEllipse(200, 100, 100, 50, 0.4243, 0, 2 * Math.PI)
    .add3DFace(
        0, 0, 10,
        20, 0, 10,
        20, -20, 20,
        0, -20, 20);

fs.writeFileSync('examples/example.dxf', dxf.stringify());
