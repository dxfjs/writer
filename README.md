# writer

A Javascript dxf generator, written in Typescript.

![ci](https://github.com/tarikjabiri/dxf/actions/workflows/ci.yml/badge.svg)
![publish](https://github.com/tarikjabiri/dxf/actions/workflows/cd.yml/badge.svg)
[![codecov](https://codecov.io/gh/dxfjs/writer/branch/main/graph/badge.svg?token=P5QJAUXZTA)](https://codecov.io/gh/dxfjs/writer)


![GitHub](https://img.shields.io/github/license/dxfjs/writer?color=%2334D058&label=License&logo=Open%20Access&logoColor=%23959DA5)
![npm (scoped)](https://img.shields.io/npm/v/@tarikjabiri/dxf?color=%2334D058&logo=npm)
![npm](https://img.shields.io/npm/dt/@tarikjabiri/dxf?color=%2334D058&logo=npm)

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
dxf.addLine(point3d(0, 0), point3d(100, 100));
// To get the dxf string just call the stringify() method
const dxfString = dxf.stringify();
```

## More informations

- [Documentation](https://dxf.vercel.app/)

