# writer

A Javascript dxf generator, written in Typescript.

![ci](https://github.com/tarikjabiri/dxf/actions/workflows/ci.yml/badge.svg)
![publish](https://github.com/tarikjabiri/dxf/actions/workflows/cd.yml/badge.svg)
[![npm version](https://badge.fury.io/js/%40tarikjabiri%2Fdxf.svg)](https://badge.fury.io/js/%40tarikjabiri%2Fdxf)
![npm](https://img.shields.io/npm/dw/@tarikjabiri/dxf)

<!--[Image entity scale and rotation](https://stackoverflow.com/questions/20521807/dxf-image-entity-group-code-explanation) explanation.-->

## Installation

```bash
yarn add @tarikjabiri/dxf
# Or npm
npm i @tarikjabiri/dxf
# Or pnpm
pnpm add @tarikjabiri/dxf
```

## Getting started

```javascript
import { DxfWriter, point3d } from "@tarikjabiri/dxf";
const dxf = new DxfWriter();
dxf.addLine(point3d(0, 0, 0), point3d(100, 100, 0));
// To get the dxf string just call the stringify() method
const dxfString = dxf.stringify();
```

## More informations

- [Documentation](https://dxf.vercel.app/)

## License

![GitHub](https://img.shields.io/github/license/tarikjabiri/dxf?style=for-the-badge)

## Become a patron

[![Support me on Patreon](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Fshieldsio-patreon.vercel.app%2Fapi%3Fusername%3Duser%3Fu%3D33866044%26type%3Dpatrons&style=for-the-badge)](https://patreon.com/user?u=33866044)

<a href="https://www.archilogic.com/">
<img width="48" src="https://avatars.githubusercontent.com/u/6620048?s=200&v=4" style="width:48px" alt="Archilogic | Interior space for the digital world">
</a>
