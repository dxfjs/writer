# Getting Started

## Installation

::: code-group

```sh [npm]
$ npm install @tarikjabiri/dxf
```

```sh [pnpm]
$ pnpm add @tarikjabiri/dxf
```

```sh [yarn]
$ yarn add @tarikjabiri/dxf
```

:::

## Quick start

```ts
import { Writer, point } from "@tarikjabiri/dxf";

const writer = new Writer();
const modelSpace = writer.document.modelSpace;

// Add entites to the model space
modelSpace.addLine({
  start: point(),
  end: point(100, 100),
  // Other options...
});

// Get the dxf content
const content = writer.stringify();
```
