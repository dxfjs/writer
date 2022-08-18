---
layout: doc
---

# Getting started

## Installation

`NPM`
```bash
npm i @tarikjabiri/dxf
```
`YARN`
```bash
yarn add @tarikjabiri/dxf
```
`PNPM`
```bash
pnpm add @tarikjabiri/dxf
```

## Quick start

```js
import { DxfWriter, point3d } from "@tarikjabiri/dxf";
const dxf = new DxfWriter();
dxf.addLine(point3d(0, 0, 0), point3d(100, 100, 0));
// To get the dxf string just call the stringify() method
const dxfString = dxf.stringify();
```
