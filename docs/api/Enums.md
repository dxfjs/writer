## `InvisibleEdgeFlags`

```ts
declare enum InvisibleEdgeFlags {
    None = 0,
    First = 1,
    Second = 2,
    Third = 4,
    Fourth = 8
}
```
## `ImageDisplayFlags`

```ts
declare enum ImageDisplayFlags {
    ShowImage = 1,
    ShowImageWhenNotAlignedWithScreen = 2,
    UseClippingBoundary = 4,
    TransparencyIsOn = 8
}
```
## `ImageClippingType`

```ts
declare enum ImageClippingType {
    Rectangular = 1,
    Polygonal = 2
}
```
## `ImageClippingStateFlag`

```ts
declare enum ImageClippingStateFlag {
    Off = 0,
    On = 1
}
```
## `ImageClipModeFlag`

```ts
declare enum ImageClipModeFlag {
    Outside = 0,
    Inside = 1
}
```
## `SplineFlags`

```ts
declare enum SplineFlags {
    Closed = 1,
    Periodic = 2,
    Rational = 4,
    Planar = 8,
    Linear = 16
}
```
## `LWPolylineFlags`

```ts
declare enum LWPolylineFlags {
    None = 0,
    Closed = 1,
    Plinegen = 128
}
```
## `LayerFlags`

```ts
declare enum LayerFlags {
    None = 0,
    Frozen = 1,
    FrozenInNewViewports = 2,
    Locked = 4,
    XRefDependent = 16,
    XRefResolved = 32
}
```
## `StyleFlags`

```ts
declare enum StyleFlags {
    None = 0,
    DescribeShape = 1,
    VerticalText = 4,
    XRefDependent = 16,
    XRefResolved = 32
}
```
## `ViewFlags`

```ts
declare enum ViewFlags {
    None = 0,
    PaperSpace = 1,
    XRefDependent = 16,
    XRefResolved = 32
}
```
## `HatchPredefinedPatterns`

```ts
declare enum HatchPredefinedPatterns {
    SOLID = "SOLID",
    ANGLE = "ANGLE",
    ANSI31 = "ANSI31",
    ANSI32 = "ANSI32",
    ANSI33 = "ANSI33",
    ANSI34 = "ANSI34",
    ANSI35 = "ANSI35",
    ANSI36 = "ANSI36",
    ANSI37 = "ANSI37",
    ANSI38 = "ANSI38",
    AR_B816 = "AR_B816",
    AR_B816C = "AR_B816C",
    AR_B88 = "AR_B88",
    AR_BRELM = "AR_BRELM",
    AR_BRSTD = "AR_BRSTD",
    AR_CONC = "AR_CONC",
    AR_HBONE = "AR_HBONE",
    AR_PARQ1 = "AR_PARQ1",
    AR_RROOF = "AR_RROOF",
    AR_RSHKE = "AR_RSHKE",
    AR_SAND = "AR_SAND",
    BOX = "BOX",
    BRASS = "BRASS",
    BRICK = "BRICK",
    BRSTONE = "BRSTONE",
    CLAY = "CLAY",
    CORK = "CORK",
    CROSS = "CROSS",
    DASH = "DASH",
    DOLMIT = "DOLMIT",
    DOTS = "DOTS",
    EARTH = "EARTH",
    ESCHER = "ESCHER",
    FLEX = "FLEX",
    GOST_GLASS = "GOST_GLASS",
    GOST_WOOD = "GOST_WOOD",
    GOST_GROUND = "GOST_GROUND",
    GRASS = "GRASS",
    GRATE = "GRATE",
    GRAVEL = "GRAVEL",
    HEX = "HEX",
    HONEY = "HONEY",
    HOUND = "HOUND",
    INSUL = "INSUL",
    ACAD_ISO02W100 = "ACAD_ISO02W100",
    ACAD_ISO03W100 = "ACAD_ISO03W100",
    ACAD_ISO04W100 = "ACAD_ISO04W100",
    ACAD_ISO05W100 = "ACAD_ISO05W100",
    ACAD_ISO06W100 = "ACAD_ISO06W100",
    ACAD_ISO07W100 = "ACAD_ISO07W100",
    ACAD_ISO08W100 = "ACAD_ISO08W100",
    ACAD_ISO09W100 = "ACAD_ISO09W100",
    ACAD_ISO10W100 = "ACAD_ISO10W100",
    ACAD_ISO11W100 = "ACAD_ISO11W100",
    ACAD_ISO12W100 = "ACAD_ISO12W100",
    ACAD_ISO13W100 = "ACAD_ISO13W100",
    ACAD_ISO14W100 = "ACAD_ISO14W100",
    ACAD_ISO15W100 = "ACAD_ISO15W100",
    JIS_LC_20 = "JIS_LC_20",
    JIS_LC_20A = "JIS_LC_20A",
    JIS_LC_8 = "JIS_LC_8",
    JIS_LC_8A = "JIS_LC_8A",
    JIS_RC_10 = "JIS_RC_10",
    JIS_RC_15 = "JIS_RC_15",
    JIS_RC_18 = "JIS_RC_18",
    JIS_RC_30 = "JIS_RC_30",
    JIS_STN_1E = "JIS_STN_1E",
    JIS_STN_2_5 = "JIS_STN_2_5",
    JIS_WOOD = "JIS_WOOD",
    LINE = "LINE",
    MUDST = "MUDST",
    NET = "NET",
    NET3 = "NET3",
    PLAST = "PLAST",
    PLASTI = "PLASTI",
    SACNCR = "SACNCR",
    SQUARE = "SQUARE",
    STARS = "STARS",
    STEEL = "STEEL",
    SWAMP = "SWAMP",
    TRANS = "TRANS",
    TRIANG = "TRIANG",
    ZIGZAG = "ZIGZAG"
}
```
## `HatchPatternType`

```ts
declare enum HatchPatternType {
    UserDefined = 0,
    Predifined = 1,
    Custom = 2
}
```
## `PathTypeFlag`

```ts
declare enum PathTypeFlag {
    Default = 0,
    External = 1,
    Polyline = 2,
    Derived = 4,
    Textbox = 8,
    Outermost = 16
}
```
## `SolidFillFlag`

```ts
declare enum SolidFillFlag {
    SolidFill = 1,
    PatternFill = 0
}
```
## `AssociativityFlag`

```ts
declare enum AssociativityFlag {
    NonAssociative = 0,
    Associative = 1
}
```
## `HatchStyle`

```ts
declare enum HatchStyle {
    Normal = 0,
    Outer = 1,
    Ignore = 2
}
```
## `GradientType`

```ts
declare enum GradientType {
    LINEAR = "LINEAR",
    CYLINDER = "CYLINDER",
    INVCYLINDER = "INVCYLINDER",
    SPHERICAL = "SPHERICAL",
    HEMISPHERICAL = "HEMISPHERICAL",
    CURVED = "CURVED",
    INVSPHERICAL = "SPHERICAL",
    INVHEMISPHERICAL = "INVHEMISPHERICAL",
    INVCURVED = "INVCURVED"
}
```
## `PolylineFlags`

```ts
declare enum PolylineFlags {
    None = 0,
    Closed = 1,
    CurveFit = 2,
    SplineFit = 4,
    Polyline3D = 8,
    PolygonMesh3D = 16,
    PolygonMeshClosed = 32,
    PolyfaceMesh = 64,
    LinetypeGenerated = 128
}
```
## `SurfaceType`

```ts
declare enum SurfaceType {
    NoSmooth = 0,
    QuadraticBSpline = 5,
    CubicBSpline = 6,
    Bezier = 8
}
```
## `ImageDefResolutionUnits`

```ts
declare enum ImageDefResolutionUnits {
    NoUnits = 0,
    Centimeters = 2,
    Inch = 5
}
```
## `BlockFlags`

```ts
declare enum BlockFlags {
    None = 0,
    AnonymousBlock = 1,
    HasNonConstantAttribute = 2,
    XRef = 4,
    XRefOverlay = 8,
    ExternallyDependent = 16,
    ResolvedXRef = 32,
    ReferencedXRef = 64
}
```
## `AppIdFlags`

```ts
declare enum AppIdFlags {
    None = 0,
    XRefDependent = 16,
    XRefResolved = 32
}
```
## `DimStyleFlags`

```ts
declare enum DimStyleFlags {
    None = 0,
    XRefDependent = 16,
    XRefRefesolved = 32
}
```
## `Colors`

```ts
declare enum Colors {
    Red = 1,
    Green = 3,
    Cyan = 4,
    Blue = 5,
    Magenta = 6,
    White = 7,
    Black = 0,
    Yellow = 2
}
```
## `Units`

```ts
declare enum Units {
    Unitless = 0,
    Inches = 1,
    Feet = 2,
    Miles = 3,
    Millimeters = 4,
    Centimeters = 5,
    Meters = 6,
    Kilometers = 7,
    Microinches = 8,
    Mils = 9,
    Yards = 10,
    Angstroms = 11,
    Nanometers = 12,
    Microns = 13,
    Decimeters = 14,
    Decameters = 15,
    Hectometers = 16,
    Gigameters = 17,
    AstronomicalUnits = 18,
    LightYears = 19,
    Parsecs = 20,
    USSurveyFeet = 21,
    USSurveyInch = 22,
    USSurveyYard = 23,
    USSurveyMile = 24
}