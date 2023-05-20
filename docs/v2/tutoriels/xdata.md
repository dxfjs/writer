---
layout: doc
---

# Extended data (XDATA)

Extended data allows for the inclusion of additional information that is not explicitly defined by the standard DXF entity data, such as custom application-specific data or metadata. It is stored as a list of name-value pairs associated with the entity.

## Register application id

To use XDATA in a DXF file, you need to first register an [APPID](/guide/tables.html#appid) in the tables section of the file:

```ts
const appIdTest = dxf.tables.addAppId("TEST_APPID")
```

## Create an entity

Next create an entity that needs XDATA to be associated with it:

```ts
const line = dxf.addLine(point3d(), point3d(100, 100))
```

## Add xdata object

```ts
const xdataTest = line.addXData(appIdTest.name)
```

## Add a string
```ts
xdataTest.string('Test string')
```

## Add a layer name
```ts
xdataTest.layerName('layer_name')
```

:::danger
The layer name should be defined in order to make DXF file valid.

```ts
const layerExist = dxf.layer('layer_name')
if (layerExist) {
  xdataTest.layerName(layerExist.name)
}
```
:::

## Add a binary data
```ts
xdataTest.binaryData('.....')
```

## Add a database handle
```ts
xdataTest.databaseHandle('1A16235')
```

## Add a 3 reals
```ts
xdataTest.point(point3d(100.2, 100.3, 100))
```

## Add a world space position
```ts
xdataTest.position(point3d(100.2, 100.3, 100))
```

## Add a world space displacement
```ts
xdataTest.displacement(point3d(100.2, 100.3, 100))
```

## Add a world direction
```ts
xdataTest.displacement(point3d(100.2, 100.3, 100))
```

## Add a real
```ts
xdataTest.real(100.34)
```

## Add a distance
```ts
xdataTest.distance(1002.56)
```

## Add a scale factor
```ts
xdataTest.scale(2)
```

## Add a integer
```ts
xdataTest.integer(209)
```

## Add a long
```ts
xdataTest.long(27353653)
```
