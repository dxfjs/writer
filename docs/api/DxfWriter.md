---
layout: doc
title: DxfWriter class
---

# `DxfWriter`

## `DxfWriter.setVariable()`
- **Type:** `(name: string, values: values_t) => void`. See [values_t](/api/Types.html#values-t).

Add or update a header variable, see [HEADER variables](https://help.autodesk.com/view/OARX/2018/ENU/?guid=GUID-A85E8E67-27CD-4C59-BE61-4DC9FADBE74A) for more informations.

- [Variables guide](/guide/variables).

## `DxfWriter.setCurrentLayerName()`
- **Type:** `(name: string) => void`.

Sets the current layer, to be used for the new entity.

## `DxfWriter.setUnits()`
- **Type:** `(units: Units) => void`. See [Units](/api/Enums.html#units).

Sets the default drawing units for AutoCAD DesignCenter blocks.

## `DxfWriter.addLType()`
- **Type:** `(name: string, descriptive: string, elements: number[]) => DxfLType`.

## `DxfWriter.addLayer()`
- **Type:** `(name: string, color: number, lineType: string, flags = LayerFlags.None) => DxfLayer`. See [LayerFlags](/api/Enums.html#layerflags).

## `DxfWriter.addBlock()`
- **Type:** `(name: string) => DxfBlock`.

## `DxfWriter.addHatch()`
- **Type:** `(boundaryPath: HatchBoundaryPaths, fill: HatchPatternOptions_t | HatchGradientOptions_t, options?: HatchOptions_t) => Hatch`. See [HatchPatternOptions_t](/api/Types.html#hatchpatternoptions-t), [HatchGradientOptions_t](/api/Types.html#hatchgradientoptions-t) and [HatchOptions_t](/api/Types.html#hatchoptions-t).

## `DxfWriter.addLine()`
- **Type:** `(startPoint: point3d_t, endPoint: point3d_t, options?: options_t) => Line`. See [point3d_t](/api/Types.html#point3d-t)

## `DxfWriter.addLWPolyline()`
- **Type:** `(points: lwPolylineVertex_t[], options?: lwPolylineOptions_t) => LWPolyline`. See [lwPolylineVertex_t](/api/Types.html#lwpolylinevertex-t) and [lwPolylineOptions_t](/api/Types.html#lwpolylineoptions-t)

## `DxfWriter.addRectangle()`
- **Type:** `(topLeft: point2d_t, bottomRight: point2d_t, options?: rectangleOptions_t) => LWPolyline`.

## `DxfWriter.addPolyline3D()`
- **Type:** `(points: (point3d_t | point2d_t)[], options?: polylineOptions_t) => Polyline`.

:::danger
`DxfWriter.addPolyline3D()` will be `DxfWriter.addPolyline()`in the future when the `Polyline` class is fully implemented. Please use `addLWPolyline()` instead.
:::

## `DxfWriter.addPoint()`
- **Type:** `(x: number, y: number, z: number, options?: options_t) => Point`.

## `DxfWriter.addCircle()`
- **Type:** `(center: point3d_t, radius: number, options?: options_t) => Circle`.

## `DxfWriter.addArc()`
- **Type:** `(center: point3d_t, radius: number, startAngle: number, endAngle: number, options?: options_t) => Arc`.

## `DxfWriter.addSpline()`
- **Type:** `(splineArgs: SplineArgs_t, options?: options_t) => Spline`.

## `DxfWriter.addEllipse()`
- **Type:** `(center: point3d_t, endPointOfMajorAxis: point3d_t, ratioOfMinorAxisToMajorAxis: number, startParameter: number, endParameter: number, options?: options_t) => Ellipse`.

## `DxfWriter.addImage()`
- **Type:** `(imagePath: string, name: string, insertionPoint: point3d_t, width: number, height: number, scale: number, rotation: number, options?: ImageOptions_t) => Image`.

## `DxfWriter.add3dFace()`
- **Type:** `(firstCorner: point3d_t, secondCorner: point3d_t, thirdCorner: point3d_t, fourthCorner: point3d_t, options?: faceOptions_t) => Face`.

## `DxfWriter.addText()`
- **Type:** `(firstAlignementPoint: point3d_t, height: number, value: string, options?: options_t) => Text`.

## `DxfWriter.addInsert()`
- **Type:** `(blockName: string, insertionPoint: point3d_t, options?: insertOptions_t) => Insert`.

## `DxfWriter.stringify()`
- **Type:** `() => string`.

## `DxfWriter.header`
## `DxfWriter.tables`
## `DxfWriter.blocks`
## `DxfWriter.entities`
## `DxfWriter.currentLayer`
## `DxfWriter.units`
