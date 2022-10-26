---
layout: doc
---

# Header

## setting Unit

To set unit use the convenient function `setUnits()`, it is a function that sets the unit:

```js
import { DxfWriter, Units } from '@tarikjabiri/dxf';

const dxf = new DxfWriter();
dxf.setUnits(Units.Meters);

```