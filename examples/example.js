import DXFWriter from "../lib/DXFWriter.js";
import * as fs from 'fs';

const dxf = new DXFWriter('AC1021');
dxf.addLine(0, 0, 100, 100);
let points = [
    [0, 0, 0],
    [0, 10, 0],
    [15, 15, 0],
    [30, 10, 0],
    [30, 0, 0]
];
dxf.addLineType('DOT', 'Dot . . . . . . . . . . . . . . . . . . . . . .', [0,-6.35])
    .addLineType('DOTTINY', 'Dot (.15x) .....................................', [0,-0.9525])
    .addLineType('DOT2', 'Dot (.5x) .....................................', [0,-3.175]);

dxf.addLayer('l_red', 1, 'DOT2', 0)
    .addLayer('l_green', 3, 'CONTINUOUS', 0)
    .addLayer('l_cyan', 4, 'CONTINUOUS', 0);

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
    .addEllipse(200, 100, 100, 50,
        0.45, 0, 3.14 * 2)
    .add3DFace(
        0, 0, 10,
        20, 0, 10,
        20, -20, 20,
        0, -20, 20);

fs.writeFileSync('examples/example.dxf', dxf.stringify());
