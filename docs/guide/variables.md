---
layout: doc
---

# Variables

Variables contains settings associated with the drawing, defined in the `HEADER` section.
> All possible [variables](https://help.autodesk.com/view/OARX/2023/ENU/?guid=GUID-A85E8E67-27CD-4C59-BE61-4DC9FADBE74A)

:::info

By default these variables are set automatically:

- `$ACADVER` The AutoCAD drawing database version number: AC1021 = AutoCAD 2007.
- `$HANDSEED` Next available handle.
- `$INSUNITS` Default drawing units for AutoCAD DesignCenter blocks: 0 = Unitless.
- `$VIEWCTR` XY center of current view on screen.
- `$CLAYER` Save the current layer name.
- `$LASTSAVEDBY` Sets to the package name.

:::

## Adding variables

Each variable is specified by a 9 group code giving the variable's name, followed by groups that supply the variable's value:

```txt
  9
$NAME // The name of the variable.
  10  // First group code
20    // The value assocoated
  20  // Second group code
20    // The value assocoated
// And so on...

// These values are random.
```

Javascript code :

```js
import { DxfWriter } from "@tarikjabiri/dxf";
const dxf = new DxfWriter();
dxf.setVariable("$ATTMODE", { 70: 2 });
// $ATTMODE is the name of the variable
// 70 is the group code
// 2 is the value to be set.
dxf.setVariable("$PLIMMAX", {
  10: 20,
  20: 30,
}); // This variable accept tow group codes and tow values
```

:::info

- The object passed as values is key value paired, the key is the group code and value associated with it.
- If you try to add a variable already added, its values will be updated.

:::
