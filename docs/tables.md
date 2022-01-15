
## APPID symbol table

To add an ```APPID``` symbol table entry, use the convinient function ```addAppId()```:

```js
import { addAppId, appIdFlags } from '@tarikjabiri/dxf';

const name1AppId = addAppId('name1'); // without flags, set to 0 automatically.
// Or
const name2AppId = addAppId('name2', appIdFlags.dependentOnXref); // Is externally dependent on an xref.
// Or
const name3AppId = addAppId('name3', appIdFlags.dependentOnXref | appIdFlags.xrefResolved);
//  If both flags are set, the externally dependent xref has been successfully resolved.
```

> By default the ```ACAD``` entry is automatically added.

## BLOCKRECORD symbol table

To add an ```BLOCKRECORD``` symbol table entry, use the convinient function ```addBlockRecord()```:

```js
import { addBlockRecord, Units } from '@tarikjabiri/dxf';

const exampleBlockRecord = addBlockRecord('example');

// You can customize the blockRecord
exampleBlockRecord.insertionUnits = Units.Unitless;
exampleBlockRecord.explodability = 1;
exampleBlockRecord.scalability = 0;
exampleBlockRecord.hardPointer = '1C'; // Hard-pointer ID/handle to associated LAYOUT object.
// '1C' is an arbitrary value, please use a correct value.
// Internally this value is not set. Until LAYOUT implemented you can set it.
// For now it is working fine without it
```

> By default the ```*Model_Space``` and ```*Paper_Space``` block records are automatically added.

## DIMSTYLE symbol table

To add an ```DIMSTYLE``` symbol table entry, use the convinient function ```addDimStyle()```:

```js
import { addDimStyle } from '@tarikjabiri/dxf';

const exampleDimStyle = addDimStyle('example');

```

> By default the ```Standard``` entry is automatically added.

!> Note that ```DIMSTYLE``` entries are not customizable at this moment, and ```DIMENSION``` entity is not implemented so no need to create these entries.

## LTYPE symbol table

### Adding LTYPE entry

To add an ```LTYPE``` symbol table entry, there is to ways to do so:

- Using the convinient factory function ```addLineType()```.
- Calling ```addLineType()``` method on ```DxfWriter``` object.

!> Note that ```LTYPE``` is not fully customizable, only basics are implemented.

```js
import DxfWriter, { addLineType } from '@tarikjabiri/dxf';

const dxf = new DxfWriter();

const axesLineType = addLineType('AXES', '____ _ ', [4, -1, 1, -1]); // Use this function if you want to store a refrence to line type object.
// Or
dxf.addLineType('AXES', '____ _ ', [4, -1, 1, -1]); // Always choose unique names.
```

### LTYPE pattern

I found this hard to understand, but I will explain it and make it simple as I can:

So first thing to remark is the line is composed of repeated part, that part what we define. Ex: ```'____ _ '```.

![logo](_media/linetype-axes.png)

Now let's tackle that part:

First you can remark that part is composed of 7 units (4 underscores, 1 space, 1 underscore, 1 space).
So every part of a pattern is composed of underscores, spaces and dots:

- Underscore represent a solid unit.
- Space represent a transparent unit.
- dot represent a dotted unit.

And that is what called the ```Descriptive```. Ex: ```'____ _ '```, ```'_ . '```, ...

Now how you define the array ```Elements```:

First you choose the length of the unit, I choose 1.
Now for this descriptive ```'____ _ '```:

- Start with 4 underscores, so first element is 4 (4 * unit length), you should group same units in one element.
- Second element is -1 (-1 * unit length). Negative value indicate transparent.
- Third element is 1.
- Fourth element is -1.

?> For the dot unit we always use 0. Ex: for ```'_ . '```, length is 1 so the array elements is ```[1, -1, 0, -1]```.

You understand the principe.

Last thing is the length of the array sould equal the number of elements. Note that 4 underscores are treated one element.

!> Note that this explanation is my personal thought, no guarantee to be correct, but it is working .
