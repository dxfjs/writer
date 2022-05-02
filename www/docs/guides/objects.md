---
sidebar_position: 5
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

:::info

Objects section have a root dictionary, you can get a reference to it by calling the convinient function `getRootDictionary()`.

The root dictionary is the first object appearing in the section, it can own objects appearing after, also can have multiple entries.

:::

To add an entry to the root dictionay use the convinient function `addEntryToRootDictionary()` and pass to it the name of the entry and a ID/Handle to owner:

```js
import {addEntryToRootDictionary} from '@tarikjabiri/dxf';

addEntryToRootDictionary('ACAD_IMAGE_DICT', '1A');
```

To add a dictionary use the convinient function `addDictionary()`:

```js
import {addDictionary} from '@tarikjabiri/dxf';

const dic = addDictionary();
// Add an entry to it
dic.addEntry('example', '1B');
```

## `IMAGEDEF` object

This object can store a reference to an external image file, which can be placed by the `IMAGE` entity.

To add an `IMAGEDEF` object use the convinient function `addImageDef()`:

```js
import {addImageDef, ImageDefResolutionUnits} from '@tarikjabiri/dxf';

const imgDef = addImageDef('path/to/image');

// You can customize it with these properties:
imgDef.acadImageDicId = ''; // Soft-pointer ID/handle to the ACAD_IMAGE_DICT dictionary.
imgDef.addImageDefReactorId('ID'); // Soft-pointer ID/handle to IMAGEDEF_REACTOR object (multiple entries; one for each instance).
imgDef.width = 1; // Image width in pixels.
imgDef.height = 1; // Image height in pixels.
imgDef.widthPixelSize = 1; // Default width of one pixel in AutoCAD units.
imgDef.heightPixelSize = 1; // Default height of one pixel in AutoCAD units.
imgDef.loaded = true; // Image is loaded.
imgDef.resolutionUnits = ImageDefResolutionUnits.NoUnits; // Resolution units.
```

The possible values of `ImageDefResolutionUnits`:

- `ImageDefResolution.UnitsNoUnits` = 0;
- `ImageDefResolution.UnitsCentimeters` = 2;
- `ImageDefResolution.UnitsInch` = 5;

:::tip

For this to work properly in `AutoCAD` you need to add a [`DICTIONARY`](#dictionary-object) object with an entry to image name and the ID/Handle to [`IMAGEDEF`](#imagedef-object) object you added. Also when you place a `IMAGE` entity add a [`IMAGEDEF_REACTOR`](#imagedef_reactor-object) object.

> But if you use the `addImage()` function all of this will be added automatically. No need to do it manually.

:::

## `IMAGEDEF_REACTOR` object

To add an `IMAGEDEF_REACTOR` object use the convinient function `addImageDefReactor()` and pass to it the ID/Handle of the `IMAGE` entity:

```js
import {addImageDefReactor} from '@tarikjabiri/dxf';

const imgDefReactor = addImageDefReactor('2F'); // Object ID for associated image entity.
```
