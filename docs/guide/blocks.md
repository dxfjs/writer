---
layout: doc
---

# Blocks

Blocks are reusable definitions used by the `INSERT` entity, defined in the `BLOCKS` section.

By default two blocks are created: `*Model_Space` and `*Paper_Space`.

:::danger
`INSERT` entity cannot use these tow blocks.
:::

## Adding blocks

To add a block use the convenient function `addBlock()`, it is a factory function that create a block, store it and return a reference to it:

```js
import { DxfWriter } from "@tarikjabiri/dxf";
const dxf = new DxfWriter();
const myBlock = dxf.addBlock("myBlock");
```

:::warning
Blocks names cannot include the following characters: < > / \ " : ; ? * | = `

By default these characters are removed from the given name if exists
:::

## Adding entities to the block

To add entities to a block just call the convenient methods to do so:

```js
import { DxfWriter, point3d } from "@tarikjabiri/dxf";
const dxf = new DxfWriter();
const myBlock = dxf.addBlock("myBlock");
myBlock.addCircle(point3d(0, 0, 0), 20);
myBlock.addLine(point3d(0, 0, 0), point3d(0, 20, 0));
// and so on ...
```

## Inserting blocks

To insert a block in the drawing use the convenient method `addInsert()`:

```js
import { DxfWriter, point3d } from "@tarikjabiri/dxf";
const dxf = new DxfWriter();
const myBlock = dxf.addBlock("myBlock");
myBlock.addCircle(point3d(0, 0, 0), 20);
myBlock.addLine(point3d(0, 0, 0), point3d(0, 20, 0));

// Inserting the block
dxf.addInsert(myBlock.name, point3d(0, 0, 0));
```
