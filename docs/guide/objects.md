---
layout: doc
---

# Objects

Objects are the nongraphical objects in the dxf.

Supported objects are:
[[toc]]


## `DICTIONARY`

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
dxf.objects.addEntryToRoot("MY_DICTIONARY", "1A");
```

To add a dictionary use the convenient function `addDictionary()`:

```js
import { DxfWriter } from "@tarikjabiri/dxf";
const dxf = new DxfWriter();
const dic = dxf.objects.addDictionary();
// Add an entry to it
dic.addEntry("example", "1B");
```

## `IMAGEDEF`

This object describes an external image file, which `IMAGE` entities place. `addImage()` adds it for you, so you only need this to reach one yourself:

```js
import { DxfWriter, ImageDefResolutionUnits } from "@tarikjabiri/dxf";
const dxf = new DxfWriter();
const imgDef = dxf.document.objects.addImageDef(
  "path/to/image.png", // The image file.
  "image", // Its name, the key in the ACAD_IMAGE_DICT dictionary.
  1792, // Image width in pixels.
  1280, // Image height in pixels.
);
// You can customize it with these properties:
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

Every definition is filed under its name in the one `ACAD_IMAGE_DICT` dictionary, created with the first image beside the `ACAD_IMAGE_VARS` raster variables, as AutoCAD does; a second call with the same name returns the same definition. Writing the file adds the `CLASS` records AutoCAD needs to load images.

:::

## `IMAGEDEF_REACTOR`

```js
import { DxfWriter } from "@tarikjabiri/dxf";
const dxf = new DxfWriter();
const imgDefReactor = dxf.document.objects.addImageDefReactor("2F"); // The handle of the IMAGE entity, which owns the reactor.
```
