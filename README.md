# writer

A Javascript dxf generator, written in Typescript.

![ci](https://github.com/tarikjabiri/dxf/actions/workflows/ci.yml/badge.svg)
![publish](https://github.com/tarikjabiri/dxf/actions/workflows/cd.yml/badge.svg)
[![codecov](https://codecov.io/gh/dxfjs/writer/branch/next/graph/badge.svg?token=P5QJAUXZTA)](https://codecov.io/gh/dxfjs/writer)


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

```js
import { Writer, point } from "@tarikjabiri/dxf";

const writer = new Writer();
const modelSpace = writer.document.modelSpace;

// Add entites to the model space
modelSpace.addLine({
  start: point(),
  end: point(100, 100),
  // Other options...
});

// To get the dxf content just call the stringify() method
const content = writer.stringify();
```

## More informations

- [Documentation](https://dxf.vercel.app/)
