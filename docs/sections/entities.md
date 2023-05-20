# Entities

All entities described here can be added to the model space, paper spaces or blocks.

```ts
const modelSpace = writer.document.modelSpace;
const paperSpace = writer.document.paperSpace;
const myBlock = writer.document.blocks.addBlock({
  name: "myBlock",
});
```

## Line

```ts
const line = modelSpace.addLine({
  start: point(),
  end: point(100, 100),
});
```

## Point

```ts
const point = modelSpace.addPoint({
  x: 5,
  y: 5,
});
```

## Ray

```ts
const line = modelSpace.addRay({
  start: point(),
  unitDirectionVector: point(10, 10),
});
```

## Spline

```ts
const spline = modelSpace.addSpline({
  controls: [
    point(),
    point(10, 10),
    point(20, 10),
    point(30, 20),
    point(100, 100),
  ],
});
```

## Text

```ts
const text = modelSpace.addText({
  value: "Hello World!",
  firstAlignmentPoint: point(),
  height: 10,
});
```
