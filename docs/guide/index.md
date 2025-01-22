---
layout: doc
---

# Getting started

## Installation

::: code-group

```sh [pnpm]
$ pnpm add @tarikjabiri/dxf
```

```sh [npm]
$ npm i @tarikjabiri/dxf
```

```sh [yarn]
$ yarn add @tarikjabiri/dxf
```

:::

## Quick start

```js
import { DxfWriter, point3d } from "@tarikjabiri/dxf";
const dxf = new DxfWriter();
dxf.addLine(point3d(0, 0), point3d(100, 100));
// To get the dxf string just call the stringify() method
const dxfString = dxf.stringify();
```
## Sponsor

<iframe src="https://github.com/sponsors/dxfjs/card" title="Sponsor dxfjs" style="border: 0; width: 100%"></iframe>

