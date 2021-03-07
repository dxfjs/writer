# DXF (Still under development)

[![Build Status](https://www.travis-ci.com/tarikjabiri/dxf.svg?branch=master)](https://www.travis-ci.com/tarikjabiri/dxf)
[![CircleCI>](https://circleci.com/gh/tarikjabiri/dxf.svg?style=svg)](https://circleci.com/github/tarikjabiri/dxf)

## _A simple JavaScript interface to DXF written in TypeScript._

DXF is a JavaScript library, for Nodejs and Browser, it's for creating DXF files in a simple way.

> influenced by [js-dxf](https://github.com/ognjen-petrovic/js-dxf)

- Now it's supporting AC1021 and above.
- Creating minimal dxf content possible.
- Tested on [AutoCAD](https://www.autodesk.com/products/autocad/overview), [LibreCAD](https://librecad.org/) and [DWG FastView](https://play.google.com/store/apps/details?id=com.gstarmc.android&hl=en&gl=US) on mobile.

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
```

***- For the priview of the example see [examples](https://github.com/tarikjabiri/dxf/tree/master/examples) directory.***

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
- Black
- Yellow

## References used in development

- [Autodesk Help](http://help.autodesk.com/view/OARX/2018/ENU/?guid=GUID-235B22E0-A567-4CF6-92D3-38A2306D73F3)
- [ezdxf](https://ezdxf.readthedocs.io/en/stable/) (a Python library written by [Manfred Moitzi](https://github.com/mozman))
- [AutoCAD Color Index (ACI)](https://gohtx.com/acadcolors.php)
- [js-dxf](https://github.com/ognjen-petrovic/js-dxf) (a Javascript library written by [Ognjen Petrovic](https://github.com/ognjen-petrovic))

## License

MIT
