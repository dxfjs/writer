# Getting started

## Installation

```bash
yarn add @tarikjabiri/dxf@2.0.0-alpha
# Or npm
npm i @tarikjabiri/dxf@2.0.0-alpha
```

## Quick start

```javascript
import DxfWriter, { point3d } from '@tarikjabiri/dxf';

const dxf = new DxfWriter();

dxf.addLine(point3d(0, 0, 0), point3d(100, 100, 0));

// To get the dxf string just call the stringify() method
const dxfString = dxf.stringify();
```
