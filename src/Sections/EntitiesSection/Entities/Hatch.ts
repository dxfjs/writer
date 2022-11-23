import { BoundingBox, boundingBox_t } from 'Internals/BoundingBox'
import Entity, { CommonEntityOptions } from '../Entity'
import { point3d, vec2_t, vec3_t } from 'Internals/Helpers'

import DxfInterface from 'Internals/Interfaces/DxfInterface'
import { Dxfier } from 'Internals/Dxfier'
import PredefinedHatchPatterns from 'Internals/HatchPatterns'
import TrueColor from 'Internals/TrueColor'
import { aciHex } from 'Internals/Colors'

export enum HatchPredefinedPatterns {
	SOLID = 'SOLID',
	ANGLE = 'ANGLE',
	ANSI31 = 'ANSI31',
	ANSI32 = 'ANSI32',
	ANSI33 = 'ANSI33',
	ANSI34 = 'ANSI34',
	ANSI35 = 'ANSI35',
	ANSI36 = 'ANSI36',
	ANSI37 = 'ANSI37',
	ANSI38 = 'ANSI38',
	AR_B816 = 'AR_B816',
	AR_B816C = 'AR_B816C',
	AR_B88 = 'AR_B88',
	AR_BRELM = 'AR_BRELM',
	AR_BRSTD = 'AR_BRSTD',
	AR_CONC = 'AR_CONC',
	AR_HBONE = 'AR_HBONE',
	AR_PARQ1 = 'AR_PARQ1',
	AR_RROOF = 'AR_RROOF',
	AR_RSHKE = 'AR_RSHKE',
	AR_SAND = 'AR_SAND',
	BOX = 'BOX',
	BRASS = 'BRASS',
	BRICK = 'BRICK',
	BRSTONE = 'BRSTONE',
	CLAY = 'CLAY',
	CORK = 'CORK',
	CROSS = 'CROSS',
	DASH = 'DASH',
	DOLMIT = 'DOLMIT',
	DOTS = 'DOTS',
	EARTH = 'EARTH',
	ESCHER = 'ESCHER',
	FLEX = 'FLEX',
	GOST_GLASS = 'GOST_GLASS',
	GOST_WOOD = 'GOST_WOOD',
	GOST_GROUND = 'GOST_GROUND',
	GRASS = 'GRASS',
	GRATE = 'GRATE',
	GRAVEL = 'GRAVEL',
	HEX = 'HEX',
	HONEY = 'HONEY',
	HOUND = 'HOUND',
	INSUL = 'INSUL',
	ACAD_ISO02W100 = 'ACAD_ISO02W100',
	ACAD_ISO03W100 = 'ACAD_ISO03W100',
	ACAD_ISO04W100 = 'ACAD_ISO04W100',
	ACAD_ISO05W100 = 'ACAD_ISO05W100',
	ACAD_ISO06W100 = 'ACAD_ISO06W100',
	ACAD_ISO07W100 = 'ACAD_ISO07W100',
	ACAD_ISO08W100 = 'ACAD_ISO08W100',
	ACAD_ISO09W100 = 'ACAD_ISO09W100',
	ACAD_ISO10W100 = 'ACAD_ISO10W100',
	ACAD_ISO11W100 = 'ACAD_ISO11W100',
	ACAD_ISO12W100 = 'ACAD_ISO12W100',
	ACAD_ISO13W100 = 'ACAD_ISO13W100',
	ACAD_ISO14W100 = 'ACAD_ISO14W100',
	ACAD_ISO15W100 = 'ACAD_ISO15W100',
	JIS_LC_20 = 'JIS_LC_20',
	JIS_LC_20A = 'JIS_LC_20A',
	JIS_LC_8 = 'JIS_LC_8',
	JIS_LC_8A = 'JIS_LC_8A',
	JIS_RC_10 = 'JIS_RC_10',
	JIS_RC_15 = 'JIS_RC_15',
	JIS_RC_18 = 'JIS_RC_18',
	JIS_RC_30 = 'JIS_RC_30',
	JIS_STN_1E = 'JIS_STN_1E',
	JIS_STN_2_5 = 'JIS_STN_2_5',
	JIS_WOOD = 'JIS_WOOD',
	LINE = 'LINE',
	MUDST = 'MUDST',
	NET = 'NET',
	NET3 = 'NET3',
	PLAST = 'PLAST',
	PLASTI = 'PLASTI',
	SACNCR = 'SACNCR',
	SQUARE = 'SQUARE',
	STARS = 'STARS',
	STEEL = 'STEEL',
	SWAMP = 'SWAMP',
	TRANS = 'TRANS',
	TRIANG = 'TRIANG',
	ZIGZAG = 'ZIGZAG',
}

export enum HatchPatternType {
	UserDefined = 0,
	Predifined = 1,
	Custom = 2,
}

export type HatchPolylineVertex_t = {
	x: number;
	y: number;
	bulge?: number;
};

export function vertex(x: number, y: number, bulge?: number): HatchPolylineVertex_t {
  if (bulge)
    return {
      x,
      y,
      bulge,
    }
  else return { x, y }
}

export class HatchPolylineBoundary implements DxfInterface {
  readonly vertices: HatchPolylineVertex_t[]

  constructor(verticies?: HatchPolylineVertex_t[]) {
    this.vertices = verticies || []
  }

  add(vertex: HatchPolylineVertex_t) {
    this.vertices.push(vertex)
  }

  dxfy(dx: Dxfier): void {
    const bulge = this.vertices.find((v) => v.bulge) ? true : false
    dx.push(72, Number(bulge))
    dx.push(73, 1)
    dx.push(93, this.vertices.length)
    for (const v of this.vertices) {
      dx.point2d(v)
      if (bulge) dx.push(42, v.bulge || 0)
    }
    dx.push(97, 0)
  }
}

export enum PathTypeFlag {
	Default = 0,
	External = 1,
	Polyline = 2,
	Derived = 4,
	Textbox = 8,
	Outermost = 16,
}

export class HatchBoundaryPaths implements DxfInterface {
  pathTypeFlag: PathTypeFlag
  polylineBoundaries: HatchPolylineBoundary[]
  edgesTypeDatas: HatchEdgesTypeData[]

  constructor() {
    this.pathTypeFlag = PathTypeFlag.External | PathTypeFlag.Derived
    this.polylineBoundaries = []
    this.edgesTypeDatas = []
  }

  get length() {
    let count = 0
    if (this.isPolyline()) {
      count += this.polylineBoundaries.length
    } else if (this.isEdges()) {
      this.edgesTypeDatas.forEach((data) => {
        count += data.edgesData.length
      })
    }
    return count
  }

  addPolylineBoundary(polylineBoundary: HatchPolylineBoundary) {
    if ((this.pathTypeFlag & PathTypeFlag.Polyline) !== PathTypeFlag.Polyline)
      this.pathTypeFlag |= PathTypeFlag.Polyline
    this.polylineBoundaries.push(polylineBoundary)
  }

  private isPolyline() {
    return (
      this.polylineBoundaries &&
			(this.pathTypeFlag & PathTypeFlag.Polyline) === PathTypeFlag.Polyline
    )
  }

  private isEdges() {
    return (
      this.edgesTypeDatas &&
			(this.pathTypeFlag & PathTypeFlag.Polyline) !== PathTypeFlag.Polyline
    )
  }

  addEdgesTypeData(edgesTypeData: HatchEdgesTypeData) {
    if ((this.pathTypeFlag & PathTypeFlag.Polyline) !== PathTypeFlag.Polyline)
      this.pathTypeFlag ^= PathTypeFlag.Polyline
    this.edgesTypeDatas.push(edgesTypeData)
  }

  dxfy(dx: Dxfier) {
    if (this.isPolyline()) {
      this.polylineBoundaries.forEach((polyline) => {
        dx.push(92, this.pathTypeFlag)
        polyline.dxfy(dx)
      })
    } else if (this.isEdges()) {
      this.edgesTypeDatas.forEach((data) => {
        dx.push(92, this.pathTypeFlag)
        data.dxfy(dx)
      })
    } else {
      throw new Error('The boundary path is empty!')
    }
  }
}

export class HatchLineEdgeData implements DxfInterface {
  start: vec2_t
  end: vec2_t

  constructor(start: vec2_t, end: vec2_t) {
    this.start = start
    this.end = end
  }

  dxfy(dx: Dxfier) {
    dx.point2d(this.start)
    dx.push(11, this.end.x)
    dx.push(21, this.end.y)
  }
}

export class HatchArcEdgeData implements DxfInterface {
  center: vec2_t
  raduis: number
  startAngle: number
  endAngle: number
  isCounterClockwise: boolean

  constructor(
    center: vec2_t,
    raduis: number,
    startAngle: number,
    endAngle: number,
    isCounterClockwise: boolean
  ) {
    this.center = center
    this.raduis = raduis
    this.startAngle = startAngle
    this.endAngle = endAngle
    this.isCounterClockwise = isCounterClockwise
  }

  dxfy(dx: Dxfier) {
    dx.point2d(this.center)
    dx.push(40, this.raduis)
    dx.push(50, this.startAngle)
    dx.push(51, this.endAngle)
    dx.push(73, Number(this.isCounterClockwise))
  }
}
export class HatchEdgesTypeData implements DxfInterface {
  edgesData: DxfInterface[]
  constructor() {
    this.edgesData = []
  }

  addLineEdgeData(start: vec2_t, end: vec2_t) {
    this.edgesData.push(new HatchLineEdgeData(start, end))
  }

  addArcEdgeData(
    center: vec2_t,
    raduis: number,
    startAngle: number,
    endAngle: number,
    isCounterClockwise: boolean
  ) {
    this.edgesData.push(
      new HatchArcEdgeData(center, raduis, startAngle, endAngle, isCounterClockwise)
    )
  }

  dxfy(dx: Dxfier) {
    for (const edge of this.edgesData) {
      edge.dxfy(dx)
    }
  }
}

export enum SolidFillFlag {
	SolidFill = 1,
	PatternFill = 0,
}

export enum AssociativityFlag {
	NonAssociative = 0,
	Associative = 1,
}

export enum HatchStyle {
	Normal = 0,
	Outer = 1,
	Ignore = 2,
}

export type HatchPatternOptions_t = {
	name: HatchPredefinedPatterns;
	angle?: number;
	scale?: number;
	double?: boolean;
};

export enum GradientType {
	LINEAR = 'LINEAR',
	CYLINDER = 'CYLINDER',
	INVCYLINDER = 'INVCYLINDER',
	SPHERICAL = 'SPHERICAL',
	HEMISPHERICAL = 'HEMISPHERICAL',
	CURVED = 'CURVED',
	INVSPHERICAL = 'SPHERICAL',
	INVHEMISPHERICAL = 'INVHEMISPHERICAL',
	INVCURVED = 'INVCURVED',
}

export type HatchGradientOptions_t = {
	firstColor: number;
	secondColor?: number;
	angle?: number;
	definition?: number;
	tint?: number;
	type?: GradientType;
};

export type HatchOptions_t = CommonEntityOptions & {
	elevation?: number;
	extrusion?: vec3_t;
};

export function gradient(fill: HatchGradientOptions_t) {
  return fill
}

export function pattern(fill: HatchPatternOptions_t) {
  return fill
}

export class Hatch extends Entity {
  fill: HatchPatternOptions_t | HatchGradientOptions_t
  elevation: number
  extrusion: vec3_t
  readonly boundaryPath: HatchBoundaryPaths

  private get patternName() {
    let _patternName = HatchPredefinedPatterns.SOLID
    if(this.isPattern(this.fill)) _patternName = this.fill.name
    return _patternName
  }

  private get solidFillFlag() {
    if(this.patternName === HatchPredefinedPatterns.SOLID)
      return SolidFillFlag.SolidFill
    else return SolidFillFlag.PatternFill
  }

  constructor(
    boundaryPath: HatchBoundaryPaths,
    fill: HatchPatternOptions_t | HatchGradientOptions_t,
    options?: HatchOptions_t
  ) {
    super('HATCH', 'AcDbHatch', options)
    this.fill = fill
    this.elevation = options?.elevation || 0
    this.extrusion = options?.extrusion || point3d(0, 0, 1)
    this.boundaryPath = boundaryPath
  }

  private pattern(dx: Dxfier, fill: HatchPatternOptions_t) {
    const name = fill.name
    const angle = fill.angle ?? 0
    const scale = fill.scale || 1
    const double = fill.double || false
    dx.push(52, angle)
    dx.push(41, scale)
    dx.push(77, Number(double))
    const pattern = PredefinedHatchPatterns.get(name)
    if (pattern) {
      pattern.scale = scale
      if (angle !== 0) pattern.angle = angle
      pattern.dxfy(dx)
    }
  }

  private gradient(dx: Dxfier, fill: HatchGradientOptions_t) {
    const firstColor = fill.firstColor
    const secondColor = fill.secondColor ?? 7
    const angle = fill.angle ?? 0
    const definition = fill.definition || 0
    const tint = fill.tint ?? 1
    const type = fill.type || GradientType.LINEAR
    dx.push(450, 1)
    dx.push(451, 0)
    dx.push(460, angle)
    dx.push(461, definition)
    dx.push(452, fill.secondColor ? 0 : 1)
    dx.push(462, tint)
    dx.push(453, 2)
    dx.push(463, 0)
    dx.push(63, firstColor)
    dx.push(421, TrueColor.fromHex(aciHex(firstColor)))
    dx.push(463, 1)
    dx.push(63, secondColor)
    dx.push(421, TrueColor.fromHex(aciHex(secondColor)))
    dx.push(470, type)
  }

  private isPattern(
    fill: HatchPatternOptions_t | HatchGradientOptions_t
  ): fill is HatchPatternOptions_t {
    return 'name' in fill
  }

  override boundingBox(): boundingBox_t {
    return BoundingBox.pointBBox(point3d(0, 0))
  }

  override dxfy(dx: Dxfier): void {
    super.dxfy(dx)
    dx.point3d(point3d(0, 0, this.elevation))
    dx.push(210, this.extrusion.x)
    dx.push(220, this.extrusion.y)
    dx.push(230, this.extrusion.z)
    dx.name(this.patternName)
    dx.push( 70, this.solidFillFlag)
    dx.push(71, AssociativityFlag.NonAssociative)
    dx.push(91, this.boundaryPath.length)
    this.boundaryPath.dxfy(dx)
    dx.push(75, HatchStyle.Outer)
    dx.push(76, HatchPatternType.Predifined)
    if (this.isPattern(this.fill)) {
      if(this.solidFillFlag === SolidFillFlag.PatternFill)
        this.pattern(dx, this.fill)
      dx.push(47, 1)
      dx.push(98, 0)
    } else {
      dx.push(47, 1)
      dx.push(98, 0)
      this.gradient(dx, this.fill)
    }
  }
}
