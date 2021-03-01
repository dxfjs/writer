# DXF (Still under development)
## _A simple JavaScript interface to DXF written in TypeScript._

DXF is a JavaScript library, for Nodejs and Browser, it's making creating a DXF file in a simple way.

- Now it's supporting AC1021 and above.
- Creating minimal dxf content possible.
- Tested on AutoCAD and LibreCAD

## To test the DXF Library
### Clone the repository
```sh
git clone https://github.com/tarikjabiri/dxf.git
```
### Install dependencies
```sh
cd dxf
yarn install
```
### Build the code
```sh
yarn run build
```

### Run the example code
```sh
node examples\example.js 
```
## Node.js code example
```javascript
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
dxf.addEllipse(200, 100, 100, 50, 1, 0, 3.14 * 2);

dxf.add3DFace(0, 0, 10, 20, 0, 10, 20, -20, 20, 0, -20, 20);

fs.writeFileSync('examples/example.dxf', dxf.stringify());

```

## Entities supported

- ARC
- CIRCLE
- ELLIPSE
- FACE 3D
- LINE
- POINT
- POLYLINE
- POLYLINE 3D
- SPLINE
- TEXT

## License

MIT
