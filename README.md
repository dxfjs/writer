<div align="center">

![logo](docs/_media/logo.svg)

</div>

A [Javascript](https://www.javascript.com/) interface to [AutoCAD Dxf](https://en.wikipedia.org/wiki/AutoCAD_DXF) written in [Typescript](https://www.typescriptlang.org/).

[![jest](https://jestjs.io/img/jest-badge.svg)](https://github.com/facebook/jest)
[![CircleCI>](https://circleci.com/gh/tarikjabiri/dxf.svg?style=svg)](https://circleci.com/github/tarikjabiri/dxf)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/tarikjabiri/dxf.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/tarikjabiri/dxf/context:javascript)
[![GitHub issues](https://img.shields.io/github/issues/tarikjabiri/dxf)](https://github.com/tarikjabiri/dxf/issues)
[![npm version](https://badge.fury.io/js/%40tarikjabiri%2Fdxf.svg)](https://badge.fury.io/js/%40tarikjabiri%2Fdxf)
[![GitHub license](https://img.shields.io/github/license/tarikjabiri/dxf)](https://github.com/tarikjabiri/dxf/blob/master/LICENSE.md)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Ftarikjabiri%2Fdxf.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Ftarikjabiri%2Fdxf?ref=badge_shield)
[![jest](https://jestjs.io/img/jest-badge.svg)](https://github.com/facebook/jest)

<!--[Image entity scale and rotation](https://stackoverflow.com/questions/20521807/dxf-image-entity-group-code-explanation) explanation.-->

## Installation

```bash
yarn add @tarikjabiri/dxf
# Or npm
npm i @tarikjabiri/dxf
```

## Getting started

```javascript
import DxfWriter, { point3d } from '@tarikjabiri/dxf';

const dxf = new DxfWriter();

dxf.addLine(point3d(0, 0, 0), point3d(100, 100, 0));

// To get the dxf string just call the stringify() method
const dxfString = dxf.stringify();
```

## Supported entities

<details>

-   [Arc](https://help.autodesk.com/view/OARX/2018/ENU/?guid=GUID-0B14D8F1-0EBA-44BF-9108-57D8CE614BC8)
-   [Circle](https://help.autodesk.com/view/OARX/2018/ENU/?guid=GUID-8663262B-222C-414D-B133-4A8506A27C18)
-   [Ellipse](https://help.autodesk.com/view/OARX/2018/ENU/?guid=GUID-107CB04F-AD4D-4D2F-8EC9-AC90888063AB)
-   [3DFace](https://help.autodesk.com/view/OARX/2018/ENU/?guid=GUID-747865D5-51F0-45F2-BEFE-9572DBC5B151)
-   [Line](https://help.autodesk.com/view/OARX/2018/ENU/?guid=GUID-FCEF5726-53AE-4C43-B4EA-C84EB8686A66)
-   [Point](https://help.autodesk.com/view/OARX/2018/ENU/?guid=GUID-9C6AD32D-769D-4213-85A4-CA9CCB5C5317)
-   [LWPolyline](https://help.autodesk.com/view/OARX/2018/ENU/?guid=GUID-748FC305-F3F2-4F74-825A-61F04D757A50)
-   [Polyline](https://help.autodesk.com/view/OARX/2018/ENU/?guid=GUID-ABF6B778-BE20-4B49-9B58-A94E64CEFFF3)
-   [Spline](https://help.autodesk.com/view/OARX/2018/ENU/?guid=GUID-E1F884F8-AA90-4864-A215-3182D47A9C74)
-   [Text](https://help.autodesk.com/view/OARX/2018/ENU/?guid=GUID-62E5383D-8A14-47B4-BFC4-35824CAE8363)
-   [Image](https://help.autodesk.com/view/OARX/2018/ENU/?guid=GUID-3A2FF847-BE14-4AC5-9BD4-BD3DCAEF2281)

</details>

## License

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Ftarikjabiri%2Fdxf.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Ftarikjabiri%2Fdxf?ref=badge_large)

## Become a patron

[![Support me on Patreon](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Fshieldsio-patreon.vercel.app%2Fapi%3Fusername%3Duser%3Fu%3D33866044%26type%3Dpatrons&style=for-the-badge)](https://patreon.com/user?u=33866044)
