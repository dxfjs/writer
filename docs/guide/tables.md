---
layout: doc
---

# Tables

## `APPID` record

```js
import { DxfWriter, RecordFlags } from "@tarikjabiri/dxf";
const dxf = new DxfWriter();
const name1AppId = dxf.tables.addAppId("name1"); // without flags, set to 0 automatically.
// Or
const name2AppId = dxf.tables.addAppId("name2", RecordFlags.XRefDependent); // Is externally dependent on an xref.
// Or
const name3AppId = dxf.tables.addAppId(
  "name3",
  RecordFlags.XRefDependent | RecordFlags.XRefResolved
);
//  If both flags are set, the externally dependent xref has been successfully resolved.
```

:::info

By default the `ACAD` record is automatically added.

:::

## `BLOCKRECORD` record

```js
import { DxfWriter, Units } from "@tarikjabiri/dxf";
const dxf = new DxfWriter();
const exampleBlockRecord = dxf.tables.addBlockRecord("example");

// You can customize the blockRecord
exampleBlockRecord.insertionUnits = Units.Unitless;
exampleBlockRecord.explodability = 1;
exampleBlockRecord.scalability = 0;
exampleBlockRecord.layoutObject = "1C"; // Hard-pointer ID/handle to associated LAYOUT object.
// '1C' is an arbitrary value, please use a correct value.
// Internally this value is not set. Until LAYOUT implemented you can set it.
// For now it is working fine without it
```

:::info

By default the `*Model_Space` and `*Paper_Space` block records are automatically added.

:::

## `DIMSTYLE` record

```js
import { DxfWriter } from "@tarikjabiri/dxf";
const dxf = new DxfWriter();
const exampleDimStyle = dxf.tables.addDimStyle("example");
```

:::info

The `DIMSTYLE` record accept same flags as `APPID` record: `RecordFlags`.

By default the `Standard` record is automatically added.

:::

:::warning

`DIMSTYLE` entries are not customizable at this moment, and `DIMENSION` entity is not implemented so no need to create these entries.

:::

## `LTYPE` record

### Adding LTYPE record

:::info

Note that `LTYPE` is not fully customizable, only basics are implemented.

:::

```js
import { DxfWriter } from "@tarikjabiri/dxf";
const dxf = new DxfWriter();
const axesLType = dxf.addLType("AXES", "____ _ ", [4, -1, 1, -1]); // Use this function if you want to store a refrence to line type object.
// Or
dxf.addLType("AXES", "____ _ ", [4, -1, 1, -1]); // Always choose unique names.
```

:::info

The `LTYPE` record accept same flags as `APPID` record: `RecordFlags`.

By default `ByBlock`, `ByLayer` and `Continuous` line types are automatically added.

:::

> **More predefined line types will be added in the future for convenient.**

### LineType pattern

I found this hard to understand, but I will explain it and make it simple as I can:

So first thing to remark is the line is composed of repeated part, that part what we define. Ex: `'____ _ '`.

![logo](_media/linetype-axes.png)

Now let's tackle that part:

First you can remark that part is composed of 7 units (4 underscores, 1 space, 1 underscore, 1 space). So every part of a pattern is composed of underscores, spaces and dots:

- Underscore represent a solid unit.
- Space represent a transparent unit.
- dot represent a dotted unit.

And that is what called the `Descriptive`. Ex: `'____ _ '`, `'_ . '`, ...

Now how you define the array `Elements`:

First you choose the length of the unit, I choose 1. Now for this descriptive `'____ _ '`:

- Start with 4 underscores, so first element is 4 (4 \* unit length), you should group same units in one element.
- Second element is -1 (-1 \* unit length). Negative value indicate transparent.
- Third element is 1.
- Fourth element is -1.

:::info

For the dot unit we always use 0. Ex: for `'_ . '`, length is 1 so the array elements is `[1, -1, 0, -1]`.

:::

You understand the principle.

Last thing is the length of the array should equal the number of elements. Note that 4 underscores are treated one element.

[See more informations](https://help.autodesk.com/view/OARX/2018/ENU/?guid=GUID-5A6E6759-8A9A-4A8A-9AEE-EE9DB72F792D)

:::warning

This explanation is my personal thought, no guarantee to be correct, but it is working 😉.

:::

## `LAYER` record

```js
import { DxfWriter, Colors, LayerFlags } from "@tarikjabiri/dxf";
const dxf = new DxfWriter();
const exampleLayer = dxf.addLayer("example", Colors.Red, "Continuous"); // Use this function if you want to store a refrence to layer object.
// Or
dxf.addLayer("example", Colors.Red, "Continuous"); // Always choose unique names.
// Continuous is the name of lineType it could be a lineType you define.
// You can set some flags like this:
const exampleLayer = dxf.addLayer(
  "example",
  Colors.Red,
  "Continuous",
  LayerFlags.Frozen | LayerFlags.Locked
);
```

:::info

If no flag is set, by default the flag is set to 0 which make the layer thawed.

:::

Possible values in `LayerFlags`:

- `LayerFlags.None`
- `LayerFlags.Frozen`
- `LayerFlags.FrozenInNewViewports`
- `LayerFlags.Locked`
- `LayerFlags.XRefDependent`
- `LayerFlags.XRefResolved`

There are 8 colors predefined in `Colors`:

- `Colors.Red`.
- `Colors.Green`.
- `Colors.Cyan`.
- `Colors.Blue`.
- `Colors.Magenta`.
- `Colors.White`.
- `Colors.Black`.
- `Colors.Yellow`.

:::tip

For more colors please refer to [AutoCAD Color Index](https://gohtx.com/acadcolors.php).

:::

## `STYLE` record

```js
import { DxfWriter } from "@tarikjabiri/dxf";
const dxf = new DxfWriter();
const myStyle = dxf.tables.addStyle("example");
```

Possible values in `StyleFlags`:
- `StyleFlags.None`
- `StyleFlags.DescribeShape`
- `StyleFlags.VerticalText`
- `StyleFlags.XRefDependent`
- `StyleFlags.XRefResolved`

> You can customize these properties: `fixedTextHeight`, `widthFactor`, `obliqueAngle`, `textGenerationFlag`, `lastHeightUsed`, `fontFileName`, `bigFontFileName` and `flags`.

## `UCS` record

:::warning

Is not implemented 😔.

:::

## `VIEW` record

```js
import { DxfWriter } from "@tarikjabiri/dxf";
const dxf = new DxfWriter();
dxf.tables.addView({
  name: "testview",
  backClipping: 0,
  frontClipping: 0,
  isUCSAssociated: false,
  lensLength: 50.0,
  renderMode: 0,
  targetPoint: point3d(0, 0, 0),
  twistAngle: 0,
  viewCenter: point2d(40.36, 15.86),
  viewDirection: point3d(0, 0, 1),
  viewHeight: 17.91,
  viewMode: 0,
  viewWidth: 20.01,
});
```

## `VPORT` record

:::warning

Is not fully implemented 😔.

:::

:::info

Internally `*Active` record is added automatically, with some options to make fit in view possible.

:::
