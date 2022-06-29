## `tag_t`

```ts
declare type tag_t = {
    groupCode: number;
    value: number | string;
};
```
## `point3d_t`

```ts
declare type point3d_t = {
    x: number;
    y: number;
    z: number;
};
```
## `point2d_t`

```ts
declare type point2d_t = {
    x: number;
    y: number;
};
```
## `boundingBox_t`

```ts
declare type boundingBox_t = {
    topLeft: point3d_t;
    bottomRight: point3d_t;
};
```
## `options_t`

```ts
declare type options_t = {
    trueColor?: string;
    colorNumber?: number;
    layerName?: string;
    visible?: boolean;
    lineType?: string;
    lineTypeScale?: number;
};
```
## `insertOptions_t`

```ts
declare type insertOptions_t = options_t & {
    scaleFactor?: Partial<point3d_t>;
    rotationAngle?: number;
    columnCount?: number;
    rowCount?: number;
    columnSpacing?: number;
    rowSpacing?: number;
};
```
## `faceOptions_t`

```ts
declare type faceOptions_t = options_t & {
    invisibleEdges?: InvisibleEdgeFlags;
};
```
## `ImageArgs_t`

```ts
declare type ImageArgs_t = {
    width: number;
    height: number;
    scale: number;
    rotation: number;
    insertionPoint: point3d_t;
    imageDefHandle: string;
};
```
## `ImageOptions_t`

```ts
declare type ImageOptions_t = options_t & {
    imageDisplayFlags?: ImageDisplayFlags;
    clippingStateFlag?: ImageClippingStateFlag;
    clipModeFlag?: ImageClipModeFlag;
    clippingType?: ImageClippingType;
    brightness?: number;
    contrast?: number;
    fade?: number;
    classVersion?: number;
};
```
## `SplineArgs_t`

```ts
declare type SplineArgs_t = {
    controlPoints: point3d_t[];
    fitPoints?: point3d_t[];
    degreeCurve?: number;
    flags?: SplineFlags;
    knots?: number[];
    weights?: number[];
};
```
## `lwPolylineOptions_t`

```ts
declare type lwPolylineOptions_t = options_t & {
    flags?: LWPolylineFlags;
    constantWidth?: number;
    elevation?: number;
    thickness?: number;
};
```
## `lwPolylineVertex_t`

```ts
declare type lwPolylineVertex_t = {
    point: point2d_t;
    startingWidth?: number;
    endWidth?: number;
    bulge?: number;
};
```
## `HatchPolylineVertex_t`

```ts
declare type HatchPolylineVertex_t = {
    x: number;
    y: number;
    bulge?: number;
};
```
## `HatchPatternOptions_t`

```ts
declare type HatchPatternOptions_t = {
    name: HatchPredefinedPatterns;
    angle?: number;
    scale?: number;
    double?: boolean;
};
```
## `HatchGradientOptions_t`

```ts
declare type HatchGradientOptions_t = {
    firstColor: number;
    secondColor?: number;
    angle?: number;
    definition?: number;
    tint?: number;
    type?: GradientType;
};
```
## `HatchOptions_t`

```ts
declare type HatchOptions_t = options_t & {
    elevation?: number;
    extrusion?:
    point3d_t;
};
```
## `chamfer_t`

```ts
declare type chamfer_t = {
    first: number;
    second?: number;
};
```
## `rectangleOptions_t`

```ts
declare type rectangleOptions_t = lwPolylineOptions_t & {
    chamfer?: chamfer_t;
    fillet?: number;
};
```
## `rgb_t`

```ts
declare type rgb_t = {
    r: number;
    g: number;
    b: number;
};
```
## `polylineOptions_t`

```ts
declare type polylineOptions_t = options_t & {
    flags?: PolylineFlags;
    elevation?: number;
    thickness?: number;
    defaultStartWidth?: number;
    defaultEndWidth?: number;
    polygonMeshM?: number;
    polygonMeshN?: number;
    smoothSurfaceM?: number;
    smoothSurfaceN?: number;
    surfaceType?: SurfaceType;
};
```
## `entryObject_t`

```ts
declare type entryObject_t = {
    name: string;
    entryObjectHandle: string;
};
```
## `ViewArgs`

```ts
declare type ViewArgs = {
    name: string;
    flags?: ViewFlags;
    viewHeight: number;
    viewCenter: point2d_t;
    viewWidth: number;
    viewDirection: point3d_t;
    targetPoint: point3d_t;
    lensLength: number;
    frontClipping: number;
    backClipping: number;
    twistAngle: number;
    viewMode: number;
    renderMode: number;
    isUCSAssociated: boolean;
    isCameraPlottable?: boolean;
    backgroundObjectHandle?: string;
    liveSectionObjectHandle?: string;
    visualStyleObjectHandle?: string;
};
```
## `values_t`

```ts
declare type values_t = {
    [groupCode: number]: number | string;
};
```
## `HatchPatternData_t`

```ts
declare type HatchPatternData_t = {
    lineAngle: number;
    x: number;
    y: number;
    offsetX: number;
    offsetY: number;
    dashLengthItems: number[];
};