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
]

dxf.addLineType('DOT', 'Dot . . . . . . . . . . . . . . . . . . . . . .', [0,-6.35]);
dxf.addLineType('DOTTINY', 'Dot (.15x) .....................................', [0,-0.9525]);
dxf.addLineType('DOT2', 'Dot (.5x) .....................................', [0,-3.175]);

dxf.addLayer('l_red', 1, 'DOT2', 0);
dxf.addLayer('l_green', 3, 'CONTINUOUS', 0);
dxf.addLayer('l_cyan', 4, 'CONTINUOUS', 0);

dxf.setCurrentLayer('l_green');
dxf.addSpline(points, 3, 0, [0, 0, 0, 0, 0.5, 2, 2, 2, 2], [], []);
dxf.setCurrentLayer('l_red');
dxf.addCircle(60, 150, 50);
dxf.addRectangle(20, 20,100, 100);
dxf.setCurrentLayer('l_cyan');
dxf.addText(30, 30, 5, "Hello World");

dxf.addPolyline3D([
    [70, 70, 50],
    [150, 70, 0],
    [170, 170, 150]
], 0);

dxf.addArc(0, 0, 120, 0, 120);
dxf.addPoint(65, -30, 0);
dxf.addEllipse(200, 100, 100, 200, 1, 0, 3.14 * 2);

dxf.add3DFace(0, 0, 10, 20, 0, 10, 20, -20, 20, 0, -20, 20);

fs.writeFileSync('examples/example.dxf', dxf.stringify());
