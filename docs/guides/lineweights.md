---
layout: doc
---

# Lineweights

The `lineweight` property represents the lineweight as integer value in `millimeters * 100`, e.g. 0.25mm = 25, independently from the unit system used in the DXF document.

Only certain values are valid: `0`, `5`, `9`, `13`, `15`, `18`, `20`, `25`, `30`, `35`, `40`, `50`, `53`, `60`, `70`, `80`, `90`, `100`, `106`, `120`, `140`, `158`, `200`, `211`.

Values < 0 have a special meaning:

| Value  | Meaning            |
| ------ | :----------------- |
| -1     | LINEWEIGHT_BYLAYER |
| -2     | LINEWEIGHT_BYBLOCK |
| -3     | LINEWEIGHT_DEFAULT |

## Example
```ts
import { Writer, point } from "@tarikjabiri/dxf";

const writer = new Writer();
const modelSpace = writer.document.modelSpace;

modelSpace.addLine({
  start: point(),
  end: point(100, 100),
  lineWeight: 100,
});
```

:::tip
By default the lineweight is not displayed, to display it use:

```ts
writer.document.header.add("$LWDISPLAY").add(290, 1);
```
:::
