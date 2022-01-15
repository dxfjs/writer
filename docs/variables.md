# Variables

Variables contains settings associated with the drawing, defined in the ```HEADER``` section.

By default these below variables are set automatically:

- ```$ACADVER``` The AutoCAD drawing database version number: AC1027 = AutoCAD 2013.
- ```$HANDSEED``` Next available handle.
- ```$INSUNITS``` Default drawing units for AutoCAD DesignCenter blocks: 0 = Unitless.
- ```$VIEWCTR``` XY center of current view on screen.

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
import DxfWriter from '@tarikjabiri/dxf';

const dxf = new DxfWriter();

dxf.setVariable('$ATTMODE', { 70: 2 });

// $ATTMODE is the name of the variable
// 70 is the group code
// 2 is the value to be set.
dxf.setVariable('$PLIMMAX', {
    10: 20,
    20: 30
}); // This variable accept tow group codes and tow values  
```

?> The object passed as values is key value paired, the key is the group code and value associated with it.

!> If you try to add a variable already added, his values will be updated.

There are 3 type of variables:

- variables with one value.
- variables with tow values.
- variables with three values.
