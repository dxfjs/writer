# Overview

A Javascript dxf generator, written in Typescript.

[![CircleCI>](https://circleci.com/gh/tarikjabiri/dxf.svg?style=svg)](https://circleci.com/github/tarikjabiri/dxf)
[![jest](https://jestjs.io/img/jest-badge.svg)](https://github.com/facebook/jest)
[![npm version](https://badge.fury.io/js/%40tarikjabiri%2Fdxf.svg)](https://badge.fury.io/js/%40tarikjabiri%2Fdxf)
![npm](https://img.shields.io/npm/dw/@tarikjabiri/dxf)

<!--[Image entity scale and rotation](https://stackoverflow.com/questions/20521807/dxf-image-entity-group-code-explanation) explanation.-->

## Installation

```bash
yarn add @tarikjabiri/dxf@2.0.0-alpha1
# Or npm
npm i @tarikjabiri/dxf@2.0.0-alpha1
```

## Quick start

```javascript
import DxfWriter, { point3d } from '@tarikjabiri/dxf';

const dxf = new DxfWriter();

dxf.addLine(point3d(0, 0, 0), point3d(100, 100, 0));

// To get the dxf string just call the stringify() method
const dxfString = dxf.stringify();
```

## License

![GitHub](https://img.shields.io/github/license/tarikjabiri/dxf?style=for-the-badge)

## Become a patron

[![Support me on Patreon](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Fshieldsio-patreon.vercel.app%2Fapi%3Fusername%3Duser%3Fu%3D33866044%26type%3Dpatrons&style=for-the-badge)](https://patreon.com/user?u=33866044)