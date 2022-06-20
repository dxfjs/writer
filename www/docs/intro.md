---
id: get-started
title: Get started
slug: /
sidebar_position: 1
---

# Getting started

## Installation

```bash
yarn add @tarikjabiri/dxf@next
# Or npm
npm i @tarikjabiri/dxf@next
# Or pnpm
pnpm add @tarikjabiri/dxf@next
```

## Quick start

```javascript
import DxfWriter, {point3d} from '@tarikjabiri/dxf';

const dxf = new DxfWriter();

dxf.addLine(point3d(0, 0, 0), point3d(100, 100, 0));

// To get the dxf string just call the stringify() method
const dxfString = dxf.stringify();
```
