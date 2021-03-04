# DXF (Still under development)
## _A simple JavaScript interface to DXF written in TypeScript._

DXF is a JavaScript library, for Nodejs and Browser, it's for creating DXF files in a simple way.

> influenced by [js-dxf](https://github.com/ognjen-petrovic/js-dxf)

- Now it's supporting AC1021 and above.
- Creating minimal dxf content possible.
- Tested on AutoCAD,LibreCAD and DWG FastView on mobile.

## To test the DXF Library
### Clone the repository
```bash
git clone https://github.com/tarikjabiri/dxf.git
```
### Install dependencies
```bash
cd dxf
yarn install
```
### Build the code
```bash
yarn run build
```

### Run the example code
```bash
node examples/example.js 
```
## Node.js code example
```javascript
import DXFWriter from "../lib/DXFWriter.js";
import * as fs from 'fs';

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
    .addLineType('DOTTINY', 'Dot (.15x) .....................................', [0,-0.9525])
    .addLineType('DOT2', 'Dot (.5x) .....................................', [0,-3.175]);

dxf.addLayer('l_red', DXFWriter.colors.Red, 'DOT2', 0)
    .addLayer('l_green', DXFWriter.colors.Green, 'CONTINUOUS', 0)
    .addLayer('l_cyan', DXFWriter.colors.Cyan, 'CONTINUOUS', 0);

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
## Colors supported

- Red
- Green
- Cyan
- Blue
- Magenta
- White


## References used in development
- [Autodesk Help](http://help.autodesk.com/view/OARX/2018/ENU/?guid=GUID-235B22E0-A567-4CF6-92D3-38A2306D73F3)
- [ezdxf](https://ezdxf.readthedocs.io/en/stable/) (a Python library written by [Manfred Moitzi](https://github.com/mozman))
- [AutoCAD Color Index (ACI)](https://gohtx.com/acadcolors.php)
- [js-dxf](https://github.com/ognjen-petrovic/js-dxf) (a Javascript library written by [Ognjen Petrovic](https://github.com/ognjen-petrovic))
## License

MIT
