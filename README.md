# DXF (Still under development)

[![GitHub license](https://img.shields.io/github/license/tarikjabiri/dxf)](https://github.com/tarikjabiri/dxf/blob/master/LICENSE.md)
[![Build Status](https://www.travis-ci.com/tarikjabiri/dxf.svg?branch=master)](https://www.travis-ci.com/tarikjabiri/dxf)
[![Build status](https://ci.appveyor.com/api/projects/status/0k7rcm5jovyr05ua?svg=true)](https://ci.appveyor.com/project/tarikjabiri/dxf)
[![CircleCI>](https://circleci.com/gh/tarikjabiri/dxf.svg?style=svg)](https://circleci.com/github/tarikjabiri/dxf)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/tarikjabiri/dxf.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/tarikjabiri/dxf/alerts/)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/tarikjabiri/dxf.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/tarikjabiri/dxf/context:javascript)
[![GitHub issues](https://img.shields.io/github/issues/tarikjabiri/dxf)](https://github.com/tarikjabiri/dxf/issues)
[![GitHub stars](https://img.shields.io/github/stars/tarikjabiri/dxf)](https://github.com/tarikjabiri/dxf/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/tarikjabiri/dxf)](https://github.com/tarikjabiri/dxf/network)

## _A simple JavaScript interface to DXF written in TypeScript._

DXF is a JavaScript library, for Nodejs and Browser, it's for creating DXF files in a simple way.

> influenced by [js-dxf](https://github.com/ognjen-petrovic/js-dxf)

- Now it's supporting AC1021 and above.
- Creating minimal dxf content possible.
- Tested on [AutoCAD](https://www.autodesk.com/products/autocad/overview), [LibreCAD](https://librecad.org/) and [DWG FastView](https://play.google.com/store/apps/details?id=com.gstarmc.android&hl=en&gl=US) on mobile.

### Install the package

```bash
yarn add @tarikjabiri/dxf
# Or npm
npm i @tarikjabiri/dxf
```

## Code example

```javascript
import DXFWriter from "@tarikjabiri/dxf";

const dxf = new DXFWriter();
dxf.addLine(0, 0, 100, 100);
let points = [
    [-300, 0, 0],
    [0, 200, 0],
    [300, 70, 0],
    [700, 100, 0],
    [1000, 1200, 0]
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
    .addEllipse(100, 50, 150, 0, 1, 0, 2 * Math.PI)
    .add3DFace(
        0, 0, 10,
        20, 0, 10,
        20, -20, 20,
        0, -20, 20);
// To get the dxf string just call the stringify() method
const dxfString = dxf.stringify();
```

***- For the priview of the example see [examples](https://github.com/tarikjabiri/dxf/tree/master/examples) directory.***

## Supported entities
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

## Colors integrated

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
