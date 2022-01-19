---
sidebar_position: 4
---

# Entities

Entities are the graphical objects in dxf.

:::note

All entities described here are added directly to the model space block.

:::

All Entities have some common options:

- `trueColor`
- `colorNumber`
- `layerName`
- `visible`
- `lineType`
- `lineTypeScale`

## `ARC` entity

An arc is a portion of the circumference of a circle.

```js
import DxfWriter, {point3d, addArc} from '@tarikjabiri/dxf';

const dxf = new DxfWriter();

dxf.addArc(point3d(0, 0, 0), 10, 0, 45);
// or
const myArc = addArc(point3d(0, 0, 0), 10, 0, 45); // If you want a reference to the added arc.
```

## `CIRCLE` entity

## `ELLIPSE` entity

## `3DFACE` entity

## `IMAGE` entity

## `INSERT` entity

## `LINE` entity

## `LWPOLYLINE` entity

## `POINT` entity

## `POLYLINE` entity

## `SPLINE` entity

## `TEXT` entity
