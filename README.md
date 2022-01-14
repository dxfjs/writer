<div align="center">

![logo](docs/_media/logo.svg)

</div>

A [Javascript](https://www.javascript.com/)  [dxf](https://en.wikipedia.org/wiki/AutoCAD_DXF) generator, written in [Typescript](https://www.typescriptlang.org/).

[![jest](https://jestjs.io/img/jest-badge.svg)](https://github.com/facebook/jest)
[![CircleCI>](https://circleci.com/gh/tarikjabiri/dxf.svg?style=svg)](https://circleci.com/github/tarikjabiri/dxf)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/tarikjabiri/dxf.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/tarikjabiri/dxf/context:javascript)
[![GitHub issues](https://img.shields.io/github/issues/tarikjabiri/dxf)](https://github.com/tarikjabiri/dxf/issues)
[![npm version](https://badge.fury.io/js/%40tarikjabiri%2Fdxf.svg)](https://badge.fury.io/js/%40tarikjabiri%2Fdxf)
[![GitHub license](https://img.shields.io/github/license/tarikjabiri/dxf)](https://github.com/tarikjabiri/dxf/blob/master/LICENSE.md)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Ftarikjabiri%2Fdxf.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Ftarikjabiri%2Fdxf?ref=badge_shield)

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

## More informations

For more informations, please refer to the [docs](https://github.com/tarikjabiri/dxf).
## License

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Ftarikjabiri%2Fdxf.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Ftarikjabiri%2Fdxf?ref=badge_large)

## Become a patron

[![Support me on Patreon](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Fshieldsio-patreon.vercel.app%2Fapi%3Fusername%3Duser%3Fu%3D33866044%26type%3Dpatrons&style=for-the-badge)](https://patreon.com/user?u=33866044)
