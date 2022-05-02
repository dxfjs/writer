---
sidebar_position: 3
---

# Blocks

Blocks are reusable definitions used by the `INSERT` entity, defined in the `BLOCKS` section.

By default two blocks are created: `*Model_Space` and `*Paper_Space`.

:::caution

`INSERT` entity cannot use these tow blocks.

:::

## Adding blocks

To add a block use the convinient function `addBlock()`, it is a factory function that create a block, store it and return a reference to it:

```js
import {addBlock} from '@tarikjabiri/dxf';

const myBlock = addBlock('myBlock');
```

## Adding entities to the block

To add entities to a block just call the convinient methods to do so:

```js
import {addBlock, point3d} from '@tarikjabiri/dxf';

const myBlock = addBlock('myBlock');
myBlock.addCircle(point3d(0, 0, 0), 20);
myBlock.addLine(point3d(0, 0, 0), point3d(0, 20, 0));
// and so on ...
```

:::info

You can add all supported entities.

:::

## Inserting blocks

To insert a block in th drawing use the convinient methode `addInsert()`:

```js
import DxfWriter, {point3d, addBlock} from '@tarikjabiri/dxf';

const dxf = new DxfWriter();

const myBlock = addBlock('myBlock');
myBlock.addCircle(point3d(0, 0, 0), 20);
myBlock.addLine(point3d(0, 0, 0), point3d(0, 20, 0));

// Inserting the block
dxf.addInsert(myBlock.name, point3d(0, 0, 0));
```
