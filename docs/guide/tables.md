---
layout: doc
---

# Tables

The TABLES section contains several tables, each of which can contain a variable number of entries. These codes are also used by AutoLISP ® and ObjectARX ® applications in entity definition lists.

[[toc]]

## `APPID`

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
- By default the `ACAD` record is automatically added.
:::

## `BLOCKRECORD`

```js
import { DxfWriter, Units } from "@tarikjabiri/dxf";
const dxf = new DxfWriter();
const blockRecord = dxf.tables.addBlockRecord("example");
// You can customize the blockRecord
blockRecord.insertionUnits = Units.Unitless;
blockRecord.explodability = 1;
blockRecord.scalability = 0;
blockRecord.layoutObject = "1C"; // Hard-pointer ID/handle to associated LAYOUT object.
// '1C' is an arbitrary value, please use a correct value.
// Internally this value is not set. Until LAYOUT implemented you can set it.
// For now it is working fine without it
```

:::info
- By default the `*Model_Space` and `*Paper_Space` block records are automatically added.
:::

## `DIMSTYLE`

```js
import { DxfWriter } from "@tarikjabiri/dxf";
const dxf = new DxfWriter();
const dimStyle = dxf.addDimStyle("example");
```
All of these properties are customizable:

> `name`, `flags`, `ownerObjectHandle`, `DIMPOST`, `DIMAPOST`, `DIMSCALE`, `DIMASZ`, `DIMEXO`, `DIMDLI`, `DIMEXE`, `DIMRND`, `DIMDLE`, `DIMTP`, `DIMTM`, `DIMTXT`, `DIMCEN`, `DIMTSZ`, `DIMALTF`, `DIMLFAC`, `DIMTVP`, `DIMTFAC`, `DIMGAP`, `DIMALTRND`, `DIMTOL`, `DIMLIM`, `DIMTIH`, `DIMTOH`, `DIMSE1`, `DIMSE2`, `DIMTAD`, `DIMZIN`, `DIMAZIN`, `DIMALT`, `DIMALTD`, `DIMTOFL`, `DIMSAH`, `DIMTIX`, `DIMSOXD`, `DIMCLRD`, `DIMCLRE`, `DIMCLRT`, `DIMADEC`, `DIMDEC`, `DIMTDEC`, `DIMALTU`, `DIMALTTD`, `DIMAUNIT`, `DIMFRAC`, `DIMLUNIT`, `DIMDSEP`, `DIMTMOVE`, `DIMJUST`, `DIMSD1`, `DIMSD2`, `DIMTOLJ`, `DIMTZIN`, `DIMALTZ`, `DIMALTTZ`, `DIMFIT`, `DIMUPT`, `DIMATFIT`, `DIMTXSTY`, `DIMLDRBLK`, `DIMBLK`, `DIMBLK1`, `DIMBLK2`, `DIMLWD`, `DIMLWE`.
:::info
- The `DIMSTYLE` record accept same flags as `APPID` record: `RecordFlags`.
- By default the `Standard` record is automatically added.
:::

## `LTYPE`

The `LTYPE` table stores all line type definitions of a dxf file. Every line type used in the file should be stored as `LTYPE` record, or the dxf file considered invalid in CADs softwares.

### Add a LTYPE record

:::warning
- Note that `LTYPE` is not fully customizable, only basics are implemented.
:::

```js
import { DxfWriter } from "@tarikjabiri/dxf";
const dxf = new DxfWriter();
const axesLType = dxf.addLType("AXES", "____ _ ", [4, -1, 1, -1]); // Use this function if you want to store a refrence to line type object.
// Or
dxf.addLType("AXES", "____ _ ", [4, -1, 1, -1]); // Always choose unique names.
```

:::info
- The `LTYPE` record accept same flags as `APPID` record: `RecordFlags`.
- By default `ByBlock`, `ByLayer` and `Continuous` line types are automatically added.
:::

> **More predefined line types will be added in the future for convenient.**

### How LType pattern work 🤔

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
- For the dot unit we always use 0. Ex: for `'_ . '`, length is 1 so the array elements is `[1, -1, 0, -1]`.
:::

You understand the principle.

Last thing is the length of the array should equal the number of elements. Note that 4 underscores are treated one element.

[See more informations](https://help.autodesk.com/view/OARX/2018/ENU/?guid=GUID-5A6E6759-8A9A-4A8A-9AEE-EE9DB72F792D)

:::warning
- **This explanation is my personal thought, no guarantee to be correct, but it is working 😉.**
:::

## `LAYER`

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
- If no flag is set, by default the flag is set to 0 which make the layer thawed.
:::

For all possible values see [LayerFlags](/api/Enums.html#layerflags) and [Colors](/api/Enums.html#colors).

:::tip
- For more colors please refer to [AutoCAD Color Index](https://gohtx.com/acadcolors.php).
:::

## `STYLE`

```js
import { DxfWriter } from "@tarikjabiri/dxf";
const dxf = new DxfWriter();
const myStyle = dxf.tables.addStyle("example");
```
For all possible values see [StyleFlags](/api/Enums.html#styleflags).

> You can customize these properties: `fixedTextHeight`, `widthFactor`, `obliqueAngle`, `textGenerationFlag`, `lastHeightUsed`, `fontFileName`, `bigFontFileName` and `flags`.

## `UCS`

Comming soon 🎉

## `VIEW`

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

## `VPORT`

Comming soon 🎉

:::info

Internally `*Active` record is added automatically, with some options to make fit in view possible.

:::
