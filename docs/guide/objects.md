---
layout: doc
---

# Objects

Objects are the nongraphical objects in the dxf.

:::info

Supported objects are:

- `DICTIONARY`
- `IMAGEDEF`
- `IMAGEDEF_REACTOR`

:::

## `DICTIONARY` object

Objects section have a root dictionary, you can get a reference to it like this:
```js
import { DxfWriter } from "@tarikjabiri/dxf";
const dxf = new DxfWriter();
const root = dxf.objects.root
```

The root dictionary is the first object appearing in the section, it can own objects appearing after, also can have multiple entries.


```js
import { DxfWriter } from "@tarikjabiri/dxf";
const dxf = new DxfWriter();
dxf.objects.addEntryToRoot("ACAD_IMAGE_DICT", "1A");
```

To add a dictionary use the convenient function `addDictionary()`:

```js
import { DxfWriter } from "@tarikjabiri/dxf";
const dxf = new DxfWriter();
const dic = dxf.objects.addDictionary();
// Add an entry to it
dic.addEntry("example", "1B");
```

## `IMAGEDEF` object

This object can store a reference to an external image file, which can be placed by the `IMAGE` entity.

```js
import { DxfWriter, ImageDefResolutionUnits } from "@tarikjabiri/dxf";
const dxf = new DxfWriter();
const imgDef = dxf.addImageDef("path/to/image");
// You can customize it with these properties:
imgDef.acadImageDictHandle = ""; // Soft-pointer ID/handle to the ACAD_IMAGE_DICT dictionary.
imgDef.addImageDefReactorHandle("handle"); // Soft-pointer ID/handle to IMAGEDEF_REACTOR object (multiple entries; one for each instance).
imgDef.width = 1; // Image width in pixels.
imgDef.height = 1; // Image height in pixels.
imgDef.widthPixelSize = 1; // Default width of one pixel in AutoCAD units.
imgDef.heightPixelSize = 1; // Default height of one pixel in AutoCAD units.
imgDef.loaded = true; // Image is loaded.
imgDef.resolutionUnits = ImageDefResolutionUnits.NoUnits; // Resolution units.
```

The possible values of `ImageDefResolutionUnits`:

- `ImageDefResolutionUnits.NoUnits` = 0;
- `ImageDefResolutionUnits.Centimeters` = 2;
- `ImageDefResolutionUnits.Inch` = 5;

:::tip

For this to work properly in `AutoCAD` you need to add a [`DICTIONARY`](#dictionary-object) object with an entry to image name and the ID/Handle to [`IMAGEDEF`](#imagedef-object) object you added. Also when you place a `IMAGE` entity add a [`IMAGEDEF_REACTOR`](#imagedef_reactor-object) object.

> But if you use the `addImage()` function all of this will be added automatically. No need to do it manually.

:::

## `IMAGEDEF_REACTOR` object

```js
import { DxfWriter } from "@tarikjabiri/dxf";
const dxf = new DxfWriter();
const imgDefReactor = dxf.addImageDefReactor("2F"); // Object ID for associated image entity.
```
