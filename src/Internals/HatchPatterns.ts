import { DxfInterface } from './Interfaces'
import { Dxfier } from './Dxfier'

export type HatchPatternData_t = {
  lineAngle: number;
  x: number;
  y: number;
  offsetX: number;
  offsetY: number;
  dashLengthItems: number[];
};

export class HatchPattern implements DxfInterface {
  name: string
  patternsData: HatchPatternData_t[]
  scale: number

  set angle(angle: number) {
    this.patternsData.forEach((p) => (p.lineAngle = angle))
  }

  constructor(name: string) {
    this.name = name
    this.patternsData = []
    this.scale = 1
  }

  dxfy(dx: Dxfier): void {
    dx.push(78, this.patternsData.length)
    for (const p of this.patternsData) {
      dx.push(53, p.lineAngle)
      dx.push(43, p.x)
      dx.push(44, p.y)
      dx.push(45, p.offsetX * this.scale)
      dx.push(46, p.offsetY * this.scale)
      dx.push(79, p.dashLengthItems.length)
      for (const d of p.dashLengthItems) {
        dx.push(49, d * this.scale)
      }
    }
  }

  add(patternData: HatchPatternData_t) {
    this.patternsData.push(patternData)
  }
}

const PredefinedHatchPatterns: Map<string, HatchPattern> = new Map()
const ANGLE = new HatchPattern('ANGLE')
ANGLE.add({
  lineAngle: 0,
  x: 0,
  y: 0,
  offsetX: 0.275,
  offsetY: 0.2,
  dashLengthItems: [-0.075],
})
ANGLE.add({
  lineAngle: 90,
  x: 0,
  y: 0,
  offsetX: 0.275,
  offsetY: 0.2,
  dashLengthItems: [-0.075],
})
PredefinedHatchPatterns.set('ANGLE', ANGLE)
const ANSI31 = new HatchPattern('ANSI31')
ANSI31.add({
  lineAngle: 45,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 1.25,
  dashLengthItems: [],
})
PredefinedHatchPatterns.set('ANSI31', ANSI31)
const ANSI32 = new HatchPattern('ANSI32')
ANSI32.add({
  lineAngle: 45,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 3.175,
  dashLengthItems: [],
})
PredefinedHatchPatterns.set('ANSI32', ANSI32)
const ANSI33 = new HatchPattern('ANSI33')
ANSI33.add({
  lineAngle: 45,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 9.525,
  dashLengthItems: [],
})
ANSI33.add({
  lineAngle: 45,
  x: 4.49013,
  y: 0,
  offsetX: 0,
  offsetY: 9.525,
  dashLengthItems: [],
})
PredefinedHatchPatterns.set('ANSI33', ANSI33)
const ANSI34 = new HatchPattern('ANSI34')
ANSI34.add({
  lineAngle: 45,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 6.35,
  dashLengthItems: [],
})
ANSI34.add({
  lineAngle: 45,
  x: 4.49013,
  y: 0,
  offsetX: 0,
  offsetY: 6.35,
  dashLengthItems: [3.175, -1.5875],
})
PredefinedHatchPatterns.set('ANSI34', ANSI34)
const ANSI35 = new HatchPattern('ANSI35')
ANSI35.add({
  lineAngle: 45,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 19.05,
  dashLengthItems: [],
})
ANSI35.add({
  lineAngle: 45,
  x: 4.49013,
  y: 0,
  offsetX: 0,
  offsetY: 19.05,
  dashLengthItems: [],
})
ANSI35.add({
  lineAngle: 45,
  x: 8.98026,
  y: 0,
  offsetX: 0,
  offsetY: 19.05,
  dashLengthItems: [],
})
ANSI35.add({
  lineAngle: 45,
  x: 13.4704,
  y: 0,
  offsetX: 0,
  offsetY: 19.05,
  dashLengthItems: [],
})
PredefinedHatchPatterns.set('ANSI35', ANSI35)
const ANSI36 = new HatchPattern('ANSI36')
ANSI36.add({
  lineAngle: 45,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 6.35,
  dashLengthItems: [],
})
ANSI36.add({
  lineAngle: 45,
  x: 4.49013,
  y: 0,
  offsetX: 0,
  offsetY: 6.35,
  dashLengthItems: [7.9375, -1.5875, 0, -1.5875],
})
PredefinedHatchPatterns.set('ANSI36', ANSI36)
const ANSI37 = new HatchPattern('ANSI37')
ANSI37.add({
  lineAngle: 45,
  x: 0,
  y: 0,
  offsetX: 5.55625,
  offsetY: 3.175,
  dashLengthItems: [7.9375, -1.5875, 0, -1.5875],
})
PredefinedHatchPatterns.set('ANSI37', ANSI37)
const ANSI38 = new HatchPattern('ANSI38')
ANSI38.add({
  lineAngle: 45,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 3.175,
  dashLengthItems: [],
})
ANSI38.add({
  lineAngle: 135,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 3.175,
  dashLengthItems: [],
})
PredefinedHatchPatterns.set('ANSI38', ANSI38)
const AR_B816 = new HatchPattern('AR_B816')
AR_B816.add({
  lineAngle: 45,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 3.175,
  dashLengthItems: [],
})
AR_B816.add({
  lineAngle: 135,
  x: 0,
  y: 0,
  offsetX: 6.35,
  offsetY: 3.175,
  dashLengthItems: [7.9375, -4.7625],
})
PredefinedHatchPatterns.set('AR_B816', AR_B816)
const AR_B816C = new HatchPattern('AR_B816C')
AR_B816C.add({
  lineAngle: 0,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 203.2,
  dashLengthItems: [],
})
AR_B816C.add({
  lineAngle: 90,
  x: 0,
  y: 0,
  offsetX: 203.2,
  offsetY: 203.2,
  dashLengthItems: [203.2, -203.2],
})
PredefinedHatchPatterns.set('AR_B816C', AR_B816C)
const AR_B88 = new HatchPattern('AR_B88')
AR_B88.add({
  lineAngle: 0,
  x: 0,
  y: 0,
  offsetX: 203.2,
  offsetY: 203.2,
  dashLengthItems: [396.875, -9.525],
})
AR_B88.add({
  lineAngle: 0,
  x: -203.2,
  y: 9.525,
  offsetX: 203.2,
  offsetY: 203.2,
  dashLengthItems: [396.875, -9.525],
})
AR_B88.add({
  lineAngle: 90,
  x: 0,
  y: 0,
  offsetX: 203.2,
  offsetY: 203.2,
  dashLengthItems: [-212.725, 193.675],
})
AR_B88.add({
  lineAngle: 90,
  x: -9.525,
  y: 0,
  offsetX: 203.2,
  offsetY: 203.2,
  dashLengthItems: [-212.725, 193.675],
})
PredefinedHatchPatterns.set('AR_B88', AR_B88)
const AR_BRELM = new HatchPattern('AR_BRELM')
AR_BRELM.add({
  lineAngle: 0,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 203.2,
  dashLengthItems: [],
})
AR_BRELM.add({
  lineAngle: 90,
  x: 0,
  y: 0,
  offsetX: 203.2,
  offsetY: 101.6,
  dashLengthItems: [203.2, -203.2],
})
PredefinedHatchPatterns.set('AR_BRELM', AR_BRELM)
const AR_BRSTD = new HatchPattern('AR_BRSTD')
AR_BRSTD.add({
  lineAngle: 0,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 135.484,
  dashLengthItems: [193.675, -9.525],
})
AR_BRSTD.add({
  lineAngle: 0,
  x: 0,
  y: 57.15,
  offsetX: 0,
  offsetY: 135.484,
  dashLengthItems: [193.675, -9.525],
})
AR_BRSTD.add({
  lineAngle: 0,
  x: 50.8,
  y: 67.7418,
  offsetX: 0,
  offsetY: 135.484,
  dashLengthItems: [92.075, -9.525],
})
AR_BRSTD.add({
  lineAngle: 0,
  x: 50.8,
  y: 124.892,
  offsetX: 0,
  offsetY: 135.484,
  dashLengthItems: [92.075, -9.525],
})
AR_BRSTD.add({
  lineAngle: 90,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 203.2,
  dashLengthItems: [57.15, -78.334],
})
AR_BRSTD.add({
  lineAngle: 90,
  x: -9.525,
  y: 0,
  offsetX: 0,
  offsetY: 203.2,
  dashLengthItems: [57.15, -78.334],
})
AR_BRSTD.add({
  lineAngle: 90,
  x: 50.8,
  y: 67.7418,
  offsetX: 0,
  offsetY: 101.6,
  dashLengthItems: [57.15, -78.334],
})
AR_BRSTD.add({
  lineAngle: 90,
  x: 41.275,
  y: 67.7418,
  offsetX: 0,
  offsetY: 101.6,
  dashLengthItems: [57.15, -78.334],
})
PredefinedHatchPatterns.set('AR_BRSTD', AR_BRSTD)
const AR_CONC = new HatchPattern('AR_CONC')
AR_CONC.add({
  lineAngle: 0,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 67.7418,
  dashLengthItems: [],
})
AR_CONC.add({
  lineAngle: 90,
  x: 0,
  y: 0,
  offsetX: 67.7418,
  offsetY: 101.6,
  dashLengthItems: [67.7418, -67.7418],
})
PredefinedHatchPatterns.set('AR_CONC', AR_CONC)
const AR_HBONE = new HatchPattern('AR_HBONE')
AR_HBONE.add({
  lineAngle: 50,
  x: 0,
  y: 0,
  offsetX: 104.896,
  offsetY: -149.807,
  dashLengthItems: [19.05, -209.55],
})
AR_HBONE.add({
  lineAngle: 355,
  x: 0,
  y: 0,
  offsetX: -51.76101082,
  offsetY: 187.25814969,
  dashLengthItems: [15.24, -167.64058417],
})
AR_HBONE.add({
  lineAngle: 100.4514447,
  x: 15.182007,
  y: -1.3282535,
  offsetX: 145.5569059,
  offsetY: -176.270089,
  dashLengthItems: [16.1900088, -178.0902446],
})
AR_HBONE.add({
  lineAngle: 46.1842,
  x: 0,
  y: 50.8,
  offsetX: 157.343,
  offsetY: -224.71,
  dashLengthItems: [28.575, -314.325],
})
AR_HBONE.add({
  lineAngle: 96.63555761,
  x: 22.5899,
  y: 47.2965,
  offsetX: 218.33577212,
  offsetY: -264.40480444,
  dashLengthItems: [24.28502314, -267.13560816],
})
AR_HBONE.add({
  lineAngle: 351.18415117,
  x: 0,
  y: 50.8,
  offsetX: 196.67912063,
  offsetY: 280.88740361,
  dashLengthItems: [22.85996707, -251.45973192],
})
AR_HBONE.add({
  lineAngle: 21,
  x: 25.4,
  y: 38.1,
  offsetX: 104.89565868,
  offsetY: -149.80652586,
  dashLengthItems: [19.05, -209.55],
})
AR_HBONE.add({
  lineAngle: 326,
  x: 25.4,
  y: 38.1,
  offsetX: -51.7604,
  offsetY: 187.258,
  dashLengthItems: [15.24, -167.64],
})
AR_HBONE.add({
  lineAngle: 71.451445,
  x: 38.0345326,
  y: 29.5779001,
  offsetX: 145.5567546,
  offsetY: -176.2700748,
  dashLengthItems: [16.1900088, -178.0899376],
})
AR_HBONE.add({
  lineAngle: 37.5,
  x: 0,
  y: 0,
  offsetX: 53.9242,
  offsetY: 65.2018,
  dashLengthItems: [0, -165.608, 0, -170.18, 0, -168.275],
})
AR_HBONE.add({
  lineAngle: 7.5,
  x: 0,
  y: 0,
  offsetX: 79.3242,
  offsetY: 90.6018,
  dashLengthItems: [0, -97.028, 0, -161.798, 0, -64.135],
})
AR_HBONE.add({
  lineAngle: -32.5,
  x: -56.642,
  y: 0,
  offsetX: 117.434,
  offsetY: 68.0212,
  dashLengthItems: [0, -63.5, 0, -198.12, 0, -262.89],
})
AR_HBONE.add({
  lineAngle: -42.5,
  x: -82.042,
  y: 0,
  offsetX: 92.0344,
  offsetY: 118.821,
  dashLengthItems: [0, -82.55, 0, -131.572, 0, -186.69],
})
PredefinedHatchPatterns.set('AR_HBONE', AR_HBONE)
const AR_PARQ1 = new HatchPattern('AR_PARQ1')
AR_PARQ1.add({
  lineAngle: 45,
  x: 0,
  y: 0,
  offsetX: 101.6,
  offsetY: 101.6,
  dashLengthItems: [304.8, -101.6],
})
AR_PARQ1.add({
  lineAngle: 135,
  x: 71.842,
  y: 71.842,
  offsetX: 101.6,
  offsetY: -101.6,
  dashLengthItems: [304.8, -101.6],
})
PredefinedHatchPatterns.set('AR_PARQ1', AR_PARQ1)
const AR_RROOF = new HatchPattern('AR_RROOF')
AR_RROOF.add({
  lineAngle: 90,
  x: 0,
  y: 0,
  offsetX: 304.8,
  offsetY: 304.8,
  dashLengthItems: [304.8, -304.8],
})
AR_RROOF.add({
  lineAngle: 90,
  x: 50.8,
  y: 0,
  offsetX: 304.8,
  offsetY: 304.8,
  dashLengthItems: [304.8, -304.8],
})
AR_RROOF.add({
  lineAngle: 90,
  x: 101.6,
  y: 0,
  offsetX: 304.8,
  offsetY: 304.8,
  dashLengthItems: [304.8, -304.8],
})
AR_RROOF.add({
  lineAngle: 90,
  x: 152.4,
  y: 0,
  offsetX: 304.8,
  offsetY: 304.8,
  dashLengthItems: [304.8, -304.8],
})
AR_RROOF.add({
  lineAngle: 90,
  x: 203.2,
  y: 0,
  offsetX: 304.8,
  offsetY: 304.8,
  dashLengthItems: [304.8, -304.8],
})
AR_RROOF.add({
  lineAngle: 90,
  x: 254,
  y: 0,
  offsetX: 304.8,
  offsetY: 304.8,
  dashLengthItems: [304.8, -304.8],
})
AR_RROOF.add({
  lineAngle: 90,
  x: 304.8,
  y: 0,
  offsetX: 304.8,
  offsetY: 304.8,
  dashLengthItems: [304.8, -304.8],
})
AR_RROOF.add({
  lineAngle: 0,
  x: 0,
  y: 304.8,
  offsetX: 304.8,
  offsetY: -304.8,
  dashLengthItems: [304.8, -304.8],
})
AR_RROOF.add({
  lineAngle: 0,
  x: 0,
  y: 355.6,
  offsetX: 304.8,
  offsetY: -304.8,
  dashLengthItems: [304.8, -304.8],
})
AR_RROOF.add({
  lineAngle: 0,
  x: 0,
  y: 406.4,
  offsetX: 304.8,
  offsetY: -304.8,
  dashLengthItems: [304.8, -304.8],
})
AR_RROOF.add({
  lineAngle: 0,
  x: 0,
  y: 457.2,
  offsetX: 304.8,
  offsetY: -304.8,
  dashLengthItems: [304.8, -304.8],
})
AR_RROOF.add({
  lineAngle: 0,
  x: 0,
  y: 508,
  offsetX: 304.8,
  offsetY: -304.8,
  dashLengthItems: [304.8, -304.8],
})
AR_RROOF.add({
  lineAngle: 0,
  x: 0,
  y: 558.8,
  offsetX: 304.8,
  offsetY: -304.8,
  dashLengthItems: [304.8, -304.8],
})
AR_RROOF.add({
  lineAngle: 0,
  x: 0,
  y: 609.6,
  offsetX: 304.8,
  offsetY: -304.8,
  dashLengthItems: [304.8, -304.8],
})
PredefinedHatchPatterns.set('AR_RROOF', AR_RROOF)
const AR_RSHKE = new HatchPattern('AR_RSHKE')
AR_RSHKE.add({
  lineAngle: 0,
  x: 0,
  y: 0,
  offsetX: 55.88,
  offsetY: 25.4,
  dashLengthItems: [381, -50.8, 127, -25.4],
})
AR_RSHKE.add({
  lineAngle: 0,
  x: 33.782,
  y: 12.7,
  offsetX: -25.4,
  offsetY: 33.782,
  dashLengthItems: [76.2, -8.382, 152.4, -19.05],
})
AR_RSHKE.add({
  lineAngle: 0,
  x: 12.7,
  y: 21.59,
  offsetX: 132.08,
  offsetY: 17.018,
  dashLengthItems: [203.2, -35.56, 101.6, -25.4],
})
PredefinedHatchPatterns.set('AR_RSHKE', AR_RSHKE)
const AR_SAND = new HatchPattern('AR_SAND')
AR_SAND.add({
  lineAngle: 0,
  x: 0,
  y: 0,
  offsetX: 647.7,
  offsetY: 304.8,
  dashLengthItems: [152.4, -127, 177.8, -76.2, 228.6, -101.6],
})
AR_SAND.add({
  lineAngle: 0,
  x: 152.4,
  y: 12.7,
  offsetX: 647.7,
  offsetY: 304.8,
  dashLengthItems: [127, -482.6, 101.6, -152.4],
})
AR_SAND.add({
  lineAngle: 0,
  x: 457.2,
  y: -19.05,
  offsetX: 647.7,
  offsetY: 304.8,
  dashLengthItems: [76.2, -787.4],
})
AR_SAND.add({
  lineAngle: 90,
  x: 0,
  y: 0,
  offsetX: 304.8,
  offsetY: 215.9,
  dashLengthItems: [292.1, -927.1],
})
AR_SAND.add({
  lineAngle: 90,
  x: 152.4,
  y: 0,
  offsetX: 304.8,
  offsetY: 215.9,
  dashLengthItems: [285.75, -933.45],
})
AR_SAND.add({
  lineAngle: 90,
  x: 279.4,
  y: 0,
  offsetX: 304.8,
  offsetY: 215.9,
  dashLengthItems: [266.7, -952.5],
})
AR_SAND.add({
  lineAngle: 90,
  x: 457.2,
  y: -19.05,
  offsetX: 304.8,
  offsetY: 215.9,
  dashLengthItems: [292.1, -927.1],
})
AR_SAND.add({
  lineAngle: 90,
  x: 533.4,
  y: -19.05,
  offsetX: 304.8,
  offsetY: 215.9,
  dashLengthItems: [292.1, -927.1],
})
AR_SAND.add({
  lineAngle: 90,
  x: 762,
  y: 0,
  offsetX: 304.8,
  offsetY: 215.9,
  dashLengthItems: [279.4, -939.8],
})
PredefinedHatchPatterns.set('AR_SAND', AR_SAND)
const BOX = new HatchPattern('BOX')
BOX.add({
  lineAngle: 37.5,
  x: 0,
  y: 0,
  offsetX: 28.5242,
  offsetY: 39.8018,
  dashLengthItems: [0, -38.608, 0, -43.18, 0, -41.275],
})
BOX.add({
  lineAngle: 7.5,
  x: 0,
  y: 0,
  offsetX: 53.9242,
  offsetY: 65.2018,
  dashLengthItems: [0, -20.828, 0, -34.798, 0, -13.335],
})
BOX.add({
  lineAngle: -32.5,
  x: -31.242,
  y: 0,
  offsetX: 66.6344,
  offsetY: 42.6212,
  dashLengthItems: [0, -12.7, 0, -45.72, 0, -59.69],
})
BOX.add({
  lineAngle: -42.5,
  x: -31.242,
  y: 0,
  offsetX: 41.2344,
  offsetY: 68.0212,
  dashLengthItems: [0, -6.35, 0, -29.972, 0, -34.29],
})
PredefinedHatchPatterns.set('BOX', BOX)
const BRASS = new HatchPattern('BRASS')
BRASS.add({
  lineAngle: 90,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 25.4,
  dashLengthItems: [],
})
BRASS.add({
  lineAngle: 90,
  x: 6.35,
  y: 0,
  offsetX: 0,
  offsetY: 25.4,
  dashLengthItems: [],
})
BRASS.add({
  lineAngle: 0,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 25.4,
  dashLengthItems: [-6.35, 6.35],
})
BRASS.add({
  lineAngle: 0,
  x: 0,
  y: 6.35,
  offsetX: 0,
  offsetY: 25.4,
  dashLengthItems: [-6.35, 6.35],
})
BRASS.add({
  lineAngle: 0,
  x: 0,
  y: 12.7,
  offsetX: 0,
  offsetY: 25.4,
  dashLengthItems: [6.35, -6.35],
})
BRASS.add({
  lineAngle: 0,
  x: 0,
  y: 19.05,
  offsetX: 0,
  offsetY: 25.4,
  dashLengthItems: [6.35, -6.35],
})
BRASS.add({
  lineAngle: 90,
  x: 12.7,
  y: 0,
  offsetX: 0,
  offsetY: 25.4,
  dashLengthItems: [6.35, -6.35],
})
BRASS.add({
  lineAngle: 90,
  x: 19.05,
  y: 0,
  offsetX: 0,
  offsetY: 25.4,
  dashLengthItems: [6.35, -6.35],
})
PredefinedHatchPatterns.set('BRASS', BRASS)
const BRICK = new HatchPattern('BRICK')
BRICK.add({
  lineAngle: 0,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 6.35,
  dashLengthItems: [],
})
BRICK.add({
  lineAngle: 0,
  x: 0,
  y: 3.175,
  offsetX: 0,
  offsetY: 6.35,
  dashLengthItems: [3.175, -1.5875],
})
PredefinedHatchPatterns.set('BRICK', BRICK)
const BRSTONE = new HatchPattern('BRSTONE')
BRSTONE.add({
  lineAngle: 0,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 6.35,
  dashLengthItems: [],
})
BRSTONE.add({
  lineAngle: 90,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 12.7,
  dashLengthItems: [6.35, -6.35],
})
BRSTONE.add({
  lineAngle: 90,
  x: 6.35,
  y: 0,
  offsetX: 0,
  offsetY: 12.7,
  dashLengthItems: [-6.35, 6.35],
})
PredefinedHatchPatterns.set('BRSTONE', BRSTONE)
const CLAY = new HatchPattern('CLAY')
CLAY.add({
  lineAngle: 0,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 8.382,
  dashLengthItems: [],
})
CLAY.add({
  lineAngle: 90,
  x: 22.86,
  y: 0,
  offsetX: 8.382,
  offsetY: 12.7,
  dashLengthItems: [8.382, -8.382],
})
CLAY.add({
  lineAngle: 90,
  x: 20.32,
  y: 0,
  offsetX: 8.382,
  offsetY: 12.7,
  dashLengthItems: [8.382, -8.382],
})
CLAY.add({
  lineAngle: 0,
  x: 22.86,
  y: 1.397,
  offsetX: 12.7,
  offsetY: 8.382,
  dashLengthItems: [-22.86, 2.54],
})
CLAY.add({
  lineAngle: 0,
  x: 22.86,
  y: 2.794,
  offsetX: 12.7,
  offsetY: 8.382,
  dashLengthItems: [-22.86, 2.54],
})
CLAY.add({
  lineAngle: 0,
  x: 22.86,
  y: 4.191,
  offsetX: 12.7,
  offsetY: 8.382,
  dashLengthItems: [-22.86, 2.54],
})
CLAY.add({
  lineAngle: 0,
  x: 22.86,
  y: 5.588,
  offsetX: 12.7,
  offsetY: 8.382,
  dashLengthItems: [-22.86, 2.54],
})
CLAY.add({
  lineAngle: 0,
  x: 22.86,
  y: 6.985,
  offsetX: 12.7,
  offsetY: 8.382,
  dashLengthItems: [-22.86, 2.54],
})
PredefinedHatchPatterns.set('CLAY', CLAY)
const CORK = new HatchPattern('CORK')
CORK.add({
  lineAngle: 0,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 4.7625,
  dashLengthItems: [],
})
CORK.add({
  lineAngle: 0,
  x: 0,
  y: 0.79375,
  offsetX: 0,
  offsetY: 4.7625,
  dashLengthItems: [],
})
CORK.add({
  lineAngle: 0,
  x: 0,
  y: 1.5875,
  offsetX: 0,
  offsetY: 4.7625,
  dashLengthItems: [],
})
CORK.add({
  lineAngle: 0,
  x: 0,
  y: 3.175,
  offsetX: 0,
  offsetY: 4.7625,
  dashLengthItems: [4.7625, -3.175],
})
PredefinedHatchPatterns.set('CORK', CORK)
const CROSS = new HatchPattern('CROSS')
CROSS.add({
  lineAngle: 0,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 3.175,
  dashLengthItems: [],
})
CROSS.add({
  lineAngle: 135,
  x: 1.5875,
  y: -1.5875,
  offsetX: 0,
  offsetY: 8.98026,
  dashLengthItems: [4.49013, -4.49013],
})
CROSS.add({
  lineAngle: 135,
  x: 2.38125,
  y: -1.5875,
  offsetX: 0,
  offsetY: 8.98026,
  dashLengthItems: [4.49013, -4.49013],
})
CROSS.add({
  lineAngle: 135,
  x: 3.175,
  y: -1.5875,
  offsetX: 0,
  offsetY: 8.98026,
  dashLengthItems: [4.49013, -4.49013],
})
PredefinedHatchPatterns.set('CROSS', CROSS)
const DASH = new HatchPattern('DASH')
DASH.add({
  lineAngle: 0,
  x: 0,
  y: 0,
  offsetX: 6.35,
  offsetY: 6.35,
  dashLengthItems: [3.175, -9.525],
})
DASH.add({
  lineAngle: 90,
  x: 1.5875,
  y: -1.5875,
  offsetX: 6.35,
  offsetY: 6.35,
  dashLengthItems: [3.175, -9.525],
})
PredefinedHatchPatterns.set('DASH', DASH)
const DOLMIT = new HatchPattern('DOLMIT')
DOLMIT.add({
  lineAngle: 0,
  x: 0,
  y: 0,
  offsetX: 3.175,
  offsetY: 3.175,
  dashLengthItems: [3.175, -3.175],
})
PredefinedHatchPatterns.set('DOLMIT', DOLMIT)
const DOTS = new HatchPattern('DOTS')
DOTS.add({
  lineAngle: 0,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 6.35,
  dashLengthItems: [],
})
DOTS.add({
  lineAngle: 45,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 17.9605,
  dashLengthItems: [8.980256121069154, -17.960512242138307],
})
PredefinedHatchPatterns.set('DOTS', DOTS)
const EARTH = new HatchPattern('EARTH')
EARTH.add({
  lineAngle: 0,
  x: 0,
  y: 0,
  offsetX: 0.79375,
  offsetY: 1.5875,
  dashLengthItems: [0, -1.5875],
})
PredefinedHatchPatterns.set('EARTH', EARTH)
const ESCHER = new HatchPattern('ESCHER')
ESCHER.add({
  lineAngle: 0,
  x: 0,
  y: 0,
  offsetX: 6.35,
  offsetY: 6.35,
  dashLengthItems: [6.35, -6.35],
})
ESCHER.add({
  lineAngle: 0,
  x: 0,
  y: 2.38125,
  offsetX: 6.35,
  offsetY: 6.35,
  dashLengthItems: [6.35, -6.35],
})
ESCHER.add({
  lineAngle: 0,
  x: 0,
  y: 4.7625,
  offsetX: 6.35,
  offsetY: 6.35,
  dashLengthItems: [6.35, -6.35],
})
ESCHER.add({
  lineAngle: 90,
  x: 0.79375,
  y: 5.55625,
  offsetX: 6.35,
  offsetY: 6.35,
  dashLengthItems: [6.35, -6.35],
})
ESCHER.add({
  lineAngle: 90,
  x: 3.175,
  y: 5.55625,
  offsetX: 6.35,
  offsetY: 6.35,
  dashLengthItems: [6.35, -6.35],
})
ESCHER.add({
  lineAngle: 90,
  x: 5.55625,
  y: 5.55625,
  offsetX: 6.35,
  offsetY: 6.35,
  dashLengthItems: [6.35, -6.35],
})
PredefinedHatchPatterns.set('ESCHER', ESCHER)
const FLEX = new HatchPattern('FLEX')
FLEX.add({
  lineAngle: 60,
  x: 0,
  y: 0,
  offsetX: -15.24,
  offsetY: 26.3964542936,
  dashLengthItems: [27.94, -2.54],
})
FLEX.add({
  lineAngle: 180,
  x: 0,
  y: 0,
  offsetX: -15.24,
  offsetY: 26.3964542936,
  dashLengthItems: [27.94, -2.54],
})
FLEX.add({
  lineAngle: 300,
  x: 0,
  y: 0,
  offsetX: 15.24,
  offsetY: 26.3964542936,
  dashLengthItems: [27.94, -2.54],
})
FLEX.add({
  lineAngle: 60,
  x: 2.54,
  y: 0,
  offsetX: -15.24,
  offsetY: 26.3964542936,
  dashLengthItems: [5.08, -25.4],
})
FLEX.add({
  lineAngle: 300,
  x: 2.54,
  y: 0,
  offsetX: 15.24,
  offsetY: 26.3964542936,
  dashLengthItems: [5.08, -25.4],
})
FLEX.add({
  lineAngle: 60,
  x: -1.27,
  y: 2.199704516,
  offsetX: -15.24,
  offsetY: 26.3964542936,
  dashLengthItems: [5.08, -25.4],
})
FLEX.add({
  lineAngle: 180,
  x: -1.27,
  y: 2.199704516,
  offsetX: -15.24,
  offsetY: 26.3964542936,
  dashLengthItems: [5.08, -25.4],
})
FLEX.add({
  lineAngle: 300,
  x: -1.27,
  y: -2.199704516,
  offsetX: 15.24,
  offsetY: 26.3964542936,
  dashLengthItems: [5.08, -25.4],
})
FLEX.add({
  lineAngle: 180,
  x: -1.27,
  y: -2.199704516,
  offsetX: -15.24,
  offsetY: 26.3964542936,
  dashLengthItems: [5.08, -25.4],
})
FLEX.add({
  lineAngle: 60,
  x: -10.16,
  y: 0,
  offsetX: -15.24,
  offsetY: 26.3964542936,
  dashLengthItems: [5.08, -25.4],
})
FLEX.add({
  lineAngle: 300,
  x: -10.16,
  y: 0,
  offsetX: 15.24,
  offsetY: 26.3964542936,
  dashLengthItems: [5.08, -25.4],
})
FLEX.add({
  lineAngle: 60,
  x: 5.08,
  y: -8.7988180894,
  offsetX: -15.24,
  offsetY: 26.3964542936,
  dashLengthItems: [5.08, -25.4],
})
FLEX.add({
  lineAngle: 180,
  x: 5.08,
  y: -8.7988180894,
  offsetX: -15.24,
  offsetY: 26.3964542936,
  dashLengthItems: [5.08, -25.4],
})
FLEX.add({
  lineAngle: 300,
  x: 5.08,
  y: 8.7988180894,
  offsetX: 15.24,
  offsetY: 26.3964542936,
  dashLengthItems: [5.08, -25.4],
})
FLEX.add({
  lineAngle: 180,
  x: 5.08,
  y: 8.7988180894,
  offsetX: -15.24,
  offsetY: 26.3964542936,
  dashLengthItems: [5.08, -25.4],
})
FLEX.add({
  lineAngle: 0,
  x: 5.08,
  y: 4.3994090574,
  offsetX: -15.24,
  offsetY: 26.3964542936,
  dashLengthItems: [17.78, -12.7],
})
FLEX.add({
  lineAngle: 0,
  x: 5.08,
  y: -4.3994090574,
  offsetX: -15.24,
  offsetY: 26.3964542936,
  dashLengthItems: [17.78, -12.7],
})
FLEX.add({
  lineAngle: 120,
  x: 1.27,
  y: 6.5991135734,
  offsetX: 15.24,
  offsetY: 26.3964542936,
  dashLengthItems: [17.78, -12.7],
})
FLEX.add({
  lineAngle: 120,
  x: -6.35,
  y: 2.199704516,
  offsetX: 15.24,
  offsetY: 26.3964542936,
  dashLengthItems: [17.78, -12.7],
})
FLEX.add({
  lineAngle: 240,
  x: -6.35,
  y: -2.199704516,
  offsetX: 15.24,
  offsetY: 26.3964542936,
  dashLengthItems: [17.78, -12.7],
})
FLEX.add({
  lineAngle: 240,
  x: 1.27,
  y: -6.5991135734,
  offsetX: 15.24,
  offsetY: 26.3964542936,
  dashLengthItems: [17.78, -12.7],
})
PredefinedHatchPatterns.set('FLEX', FLEX)
const GOST_GLASS = new HatchPattern('GOST_GLASS')
GOST_GLASS.add({
  lineAngle: 0,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 6.35,
  dashLengthItems: [6.35, -6.35],
})
GOST_GLASS.add({
  lineAngle: 45,
  x: 6.35,
  y: 0,
  offsetX: 4.490128053,
  offsetY: 4.490128053,
  dashLengthItems: [1.5875, -5.8052561314, 1.5875, -8.9802561314],
})
PredefinedHatchPatterns.set('GOST_GLASS', GOST_GLASS)
const GOST_WOOD = new HatchPattern('GOST_WOOD')
GOST_WOOD.add({
  lineAngle: 45,
  x: 0,
  y: 0,
  offsetX: 6,
  offsetY: -6,
  dashLengthItems: [5, -7],
})
GOST_WOOD.add({
  lineAngle: 45,
  x: 2.12132,
  y: 0,
  offsetX: 6,
  offsetY: -6,
  dashLengthItems: [2, -10],
})
GOST_WOOD.add({
  lineAngle: 45,
  x: 0,
  y: 2.12132,
  offsetX: 6,
  offsetY: -6,
  dashLengthItems: [2, -10],
})
PredefinedHatchPatterns.set('GOST_WOOD', GOST_WOOD)
const GOST_GROUND = new HatchPattern('GOST_GROUND')
GOST_GROUND.add({
  lineAngle: 90,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: -6,
  dashLengthItems: [10, -2],
})
GOST_GROUND.add({
  lineAngle: 90,
  x: 2,
  y: -2,
  offsetX: 0,
  offsetY: -6,
  dashLengthItems: [6, -1.5, 3, -1.5],
})
GOST_GROUND.add({
  lineAngle: 90,
  x: 4,
  y: -5,
  offsetX: 0,
  offsetY: -6,
  dashLengthItems: [10, -2],
})
PredefinedHatchPatterns.set('GOST_GROUND', GOST_GROUND)
const GRASS = new HatchPattern('GRASS')
GRASS.add({
  lineAngle: 45,
  x: 0,
  y: 0,
  offsetX: 10,
  offsetY: -10,
  dashLengthItems: [20],
})
GRASS.add({
  lineAngle: 45,
  x: 3,
  y: 0,
  offsetX: 10,
  offsetY: -10,
  dashLengthItems: [20],
})
GRASS.add({
  lineAngle: 45,
  x: 6,
  y: 0,
  offsetX: 10,
  offsetY: -10,
  dashLengthItems: [20],
})
PredefinedHatchPatterns.set('GRASS', GRASS)
const GRATE = new HatchPattern('GRATE')
GRATE.add({
  lineAngle: 90,
  x: 0,
  y: 0,
  offsetX: 17.96051224,
  offsetY: 17.96051224,
  dashLengthItems: [4.7625, -31.15852448],
})
GRATE.add({
  lineAngle: 45,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 25.4,
  dashLengthItems: [4.7625, -20.6375],
})
GRATE.add({
  lineAngle: 135,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 25.4,
  dashLengthItems: [4.7625, -20.6375],
})
PredefinedHatchPatterns.set('GRATE', GRATE)
const GRAVEL = new HatchPattern('GRAVEL')
GRAVEL.add({
  lineAngle: 0,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 0.79375,
  dashLengthItems: [],
})
GRAVEL.add({
  lineAngle: 90,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 3.175,
  dashLengthItems: [],
})
PredefinedHatchPatterns.set('GRAVEL', GRAVEL)
const HEX = new HatchPattern('HEX')
HEX.add({
  lineAngle: 228.0127875,
  x: 18.288,
  y: 25.4,
  offsetX: 305.85067529778,
  offsetY: 1.88796713245,
  dashLengthItems: [3.4172144, -338.30483639565],
})
HEX.add({
  lineAngle: 184.969741,
  x: 16.002,
  y: 22.86,
  offsetX: -305.8545235377,
  offsetY: 1.10019612724,
  dashLengthItems: [5.8640472, -580.54048893524],
})
HEX.add({
  lineAngle: 132.5104471,
  x: 10.16,
  y: 22.352,
  offsetX: -377.59492241548,
  offsetY: 1.56030959675,
  dashLengthItems: [4.1348152, -409.347227941],
})
HEX.add({
  lineAngle: 267.273689,
  x: 0.254,
  y: 16.002,
  offsetX: -508.63316875916,
  offsetY: 1.20815479432,
  dashLengthItems: [5.3400452, -528.66437425738],
})
HEX.add({
  lineAngle: 292.83365418,
  x: 0,
  y: 10.668,
  offsetX: -330.19770134945,
  offsetY: 1.23208097566,
  dashLengthItems: [5.236337, -518.39807745344],
})
HEX.add({
  lineAngle: 357.273689,
  x: 2.032,
  y: 5.842,
  offsetX: -508.63316875916,
  offsetY: 1.20815479432,
  dashLengthItems: [5.3400452, -528.66437425738],
})
HEX.add({
  lineAngle: 37.69424047,
  x: 7.366,
  y: 5.588,
  offsetX: -416.58997273292,
  offsetY: 0.91357450169,
  dashLengthItems: [7.0619366, -699.13115314247],
})
HEX.add({
  lineAngle: 72.25532837,
  x: 12.954,
  y: 9.906,
  offsetX: 586.40373773403,
  offsetY: 0.96766293399,
  dashLengthItems: [6.6671952, -660.05256601905],
})
HEX.add({
  lineAngle: 121.42956562,
  x: 14.986,
  y: 16.256,
  offsetX: 387.71230339293,
  offsetY: 1.2040754753,
  dashLengthItems: [5.35813, -530.45545698712],
})
HEX.add({
  lineAngle: 175.2363583,
  x: 12.192,
  y: 20.828,
  offsetX: -280.5442400419,
  offsetY: 2.10935518695,
  dashLengthItems: [6.1171328, -299.7393695],
})
HEX.add({
  lineAngle: 222.3974378,
  x: 6.096,
  y: 21.336,
  offsetX: 413.48123885686,
  offsetY: 0.81554484621,
  dashLengthItems: [7.9107792, -783.16772512177],
})
HEX.add({
  lineAngle: 138.81407483,
  x: 25.4,
  y: 15.748,
  offsetX: 234.164238558,
  offsetY: 2.38943100688,
  dashLengthItems: [2.7000454, -267.30565824344],
})
HEX.add({
  lineAngle: 171.4692344,
  x: 23.368,
  y: 17.526,
  offsetX: -334.082478726,
  offsetY: 1.25594916784,
  dashLengthItems: [5.1368198, -508.5463899704],
})
HEX.add({
  lineAngle: 225,
  x: 18.288,
  y: 18.288,
  offsetX: 17.96051224214,
  offsetY: 17.96051224214,
  dashLengthItems: [3.5920934, -32.32893108428],
})
HEX.add({
  lineAngle: 203.19859051,
  x: 16.51,
  y: 21.336,
  offsetX: -136.74251918,
  offsetY: 3.33518339548,
  dashLengthItems: [1.9344132, -191.50622368894],
})
HEX.add({
  lineAngle: 291.80140949,
  x: 14.732,
  y: 20.574,
  offsetX: -80.18324702488,
  offsetY: 4.71666158921,
  dashLengthItems: [2.7356562, -134.0475299],
})
HEX.add({
  lineAngle: 30.96375653,
  x: 15.748,
  y: 18.034,
  offsetX: 91.47734531502,
  offsetY: 4.35606406258,
  dashLengthItems: [4.4431966, -143.6629815291],
})
HEX.add({
  lineAngle: 161.56505118,
  x: 19.558,
  y: 20.32,
  offsetX: -56.2252967978,
  offsetY: 8.03218525675,
  dashLengthItems: [3.2128714, -77.10898116828],
})
HEX.add({
  lineAngle: 16.389540334,
  x: 0,
  y: 20.574,
  offsetX: 265.17991128726,
  offsetY: 1.43340492604,
  dashLengthItems: [4.50088, -445.58826672539],
})
HEX.add({
  lineAngle: 70.34617594,
  x: 4.318,
  y: 21.844,
  offsetX: -297.29446803469,
  offsetY: 1.70858889651,
  dashLengthItems: [3.7759894, -373.822156782],
})
HEX.add({
  lineAngle: 293.19859051,
  x: 19.558,
  y: 25.4,
  offsetX: -136.7425191801,
  offsetY: 3.33518339548,
  dashLengthItems: [3.868801, -189.57183588894],
})
HEX.add({
  lineAngle: 343.61045967,
  x: 21.082,
  y: 21.844,
  offsetX: -265.17991128725,
  offsetY: 1.433404926,
  dashLengthItems: [4.50088, -445.5882667254],
})
HEX.add({
  lineAngle: 339.44395478,
  x: 0,
  y: 4.826,
  offsetX: -136.75087638398,
  offsetY: 2.97284513779,
  dashLengthItems: [4.340352, -212.67734313106],
})
HEX.add({
  lineAngle: 294.7751406,
  x: 4.064,
  y: 3.302,
  offsetX: -306.90424056705,
  offsetY: 1.77401295215,
  dashLengthItems: [3.6367212, -360.0359338072],
})
HEX.add({
  lineAngle: 66.80140949,
  x: 19.812,
  y: 0,
  offsetX: 136.74251918012,
  offsetY: 3.33518339452,
  dashLengthItems: [3.868801, -189.57183588894],
})
HEX.add({
  lineAngle: 17.35402464,
  x: 21.336,
  y: 3.556,
  offsetX: -345.47402804977,
  offsetY: 1.51523696536,
  dashLengthItems: [4.2578274, -421.523759802],
})
HEX.add({
  lineAngle: 69.44395478,
  x: 7.366,
  y: 0,
  offsetX: -136.75087638396,
  offsetY: 2.97284513874,
  dashLengthItems: [2.170176, -214.84751913106],
})
HEX.add({
  lineAngle: 101.309932474,
  x: 18.288,
  y: 0,
  offsetX: 104.60834648271,
  offsetY: 4.98134983255,
  dashLengthItems: [1.295146, -128.21994964526],
})
HEX.add({
  lineAngle: 165.963756532,
  x: 18.034,
  y: 1.27,
  offsetX: -80.085263387,
  offsetY: 6.16040487582,
  dashLengthItems: [5.236337, -99.49054589069],
})
HEX.add({
  lineAngle: 186.00900596,
  x: 12.954,
  y: 2.54,
  offsetX: -255.26337856879,
  offsetY: 1.32949676118,
  dashLengthItems: [4.85267, -480.41364863337],
})
HEX.add({
  lineAngle: 303.69006753,
  x: 15.748,
  y: 15.748,
  offsetX: -56.35753993648,
  offsetY: 7.0446924921,
  dashLengthItems: [3.6632388, -87.9177635968],
})
HEX.add({
  lineAngle: 353.15722659,
  x: 17.78,
  y: 12.7,
  offsetX: 434.77679606606,
  offsetY: 1.0087628707,
  dashLengthItems: [6.3955676, -633.16009065031],
})
HEX.add({
  lineAngle: 60.9453959,
  x: 24.13,
  y: 11.938,
  offsetX: -204.76648550216,
  offsetY: 2.46706609031,
  dashLengthItems: [2.6150824, -258.8939231811],
})
HEX.add({
  lineAngle: 90,
  x: 25.4,
  y: 14.224,
  offsetX: 25.4,
  offsetY: 25.4,
  dashLengthItems: [1.524, -23.876],
})
HEX.add({
  lineAngle: 120.25643716,
  x: 12.446,
  y: 3.302,
  offsetX: -204.77318477297,
  offsetY: 1.8283320086,
  dashLengthItems: [3.5286696, -349.339407732],
})
HEX.add({
  lineAngle: 48.0127875,
  x: 10.668,
  y: 6.35,
  offsetX: 305.85067529778,
  offsetY: 1.88796713138,
  dashLengthItems: [6.8344288, -334.88762199565],
})
HEX.add({
  lineAngle: 0,
  x: 15.24,
  y: 11.43,
  offsetX: 25.4,
  offsetY: 25.4,
  dashLengthItems: [6.604, -18.796],
})
HEX.add({
  lineAngle: 325.3048465,
  x: 21.844,
  y: 11.43,
  offsetX: 310.04235091354,
  offsetY: -1.6064370526,
  dashLengthItems: [4.0160956, -397.5931672414],
})
HEX.add({
  lineAngle: 254.0546041,
  x: 25.146,
  y: 9.144,
  offsetX: 104.6687497289,
  offsetY: 3.48895832444,
  dashLengthItems: [3.6982908, -181.21650038772],
})
HEX.add({
  lineAngle: 207.64597536,
  x: 24.13,
  y: 5.588,
  offsetX: 545.36007557253,
  offsetY: 1.07143433066,
  dashLengthItems: [6.021451, -596.12464422938],
})
HEX.add({
  lineAngle: 175.42607874,
  x: 18.796,
  y: 2.794,
  offsetX: 331.1739336186,
  offsetY: 1.01276432357,
  dashLengthItems: [6.3702946, -630.6584645624],
})
PredefinedHatchPatterns.set('HEX', HEX)
const HONEY = new HatchPattern('HONEY')
HONEY.add({
  lineAngle: 0,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 5.4992613154,
  dashLengthItems: [3.175, -6.35],
})
HONEY.add({
  lineAngle: 120,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 5.4992613154,
  dashLengthItems: [3.175, -6.35],
})
HONEY.add({
  lineAngle: 60,
  x: 3.175,
  y: 0,
  offsetX: 0,
  offsetY: 5.4992613154,
  dashLengthItems: [3.175, -6.35],
})
PredefinedHatchPatterns.set('HONEY', HONEY)
const HOUND = new HatchPattern('HOUND')
HOUND.add({
  lineAngle: 0,
  x: 0,
  y: 0,
  offsetX: 4.7625,
  offsetY: 2.749630645,
  dashLengthItems: [3.175, -6.35],
})
HOUND.add({
  lineAngle: 120,
  x: 0,
  y: 0,
  offsetX: 4.7625,
  offsetY: 2.749630645,
  dashLengthItems: [3.175, -6.35],
})
HOUND.add({
  lineAngle: 60,
  x: 0,
  y: 0,
  offsetX: 4.7625,
  offsetY: 2.749630645,
  dashLengthItems: [-6.35, 3.175],
})
PredefinedHatchPatterns.set('HOUND', HOUND)
const INSUL = new HatchPattern('INSUL')
INSUL.add({
  lineAngle: 0,
  x: 0,
  y: 0,
  offsetX: 6.35,
  offsetY: 1.5875,
  dashLengthItems: [25.4, -12.7],
})
INSUL.add({
  lineAngle: 90,
  x: 0,
  y: 0,
  offsetX: -6.35,
  offsetY: 1.5875,
  dashLengthItems: [25.4, -12.7],
})
PredefinedHatchPatterns.set('INSUL', INSUL)
const ACAD_ISO02W100 = new HatchPattern('ACAD_ISO02W100')
ACAD_ISO02W100.add({
  lineAngle: 0,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 9.525,
  dashLengthItems: [],
})
ACAD_ISO02W100.add({
  lineAngle: 0,
  x: 0,
  y: 3.175,
  offsetX: 0,
  offsetY: 9.525,
  dashLengthItems: [3.175, -3.175],
})
ACAD_ISO02W100.add({
  lineAngle: 0,
  x: 0,
  y: 6.35,
  offsetX: 0,
  offsetY: 9.525,
  dashLengthItems: [3.175, -3.175],
})
PredefinedHatchPatterns.set('ACAD_ISO02W100', ACAD_ISO02W100)
const ACAD_ISO03W100 = new HatchPattern('ACAD_ISO03W100')
ACAD_ISO03W100.add({
  lineAngle: 0,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 5,
  dashLengthItems: [12, -3],
})
PredefinedHatchPatterns.set('ACAD_ISO03W100', ACAD_ISO03W100)
const ACAD_ISO04W100 = new HatchPattern('ACAD_ISO04W100')
ACAD_ISO04W100.add({
  lineAngle: 0,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 5,
  dashLengthItems: [12, -18],
})
PredefinedHatchPatterns.set('ACAD_ISO04W100', ACAD_ISO04W100)
const ACAD_ISO05W100 = new HatchPattern('ACAD_ISO05W100')
ACAD_ISO05W100.add({
  lineAngle: 0,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 5,
  dashLengthItems: [24, -3, 0.5, -3],
})
PredefinedHatchPatterns.set('ACAD_ISO05W100', ACAD_ISO05W100)
const ACAD_ISO06W100 = new HatchPattern('ACAD_ISO06W100')
ACAD_ISO06W100.add({
  lineAngle: 0,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 5,
  dashLengthItems: [24, -3, 0.5, -3, 0.5, -3],
})
PredefinedHatchPatterns.set('ACAD_ISO06W100', ACAD_ISO06W100)
const ACAD_ISO07W100 = new HatchPattern('ACAD_ISO07W100')
ACAD_ISO07W100.add({
  lineAngle: 0,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 5,
  dashLengthItems: [24, -3, 0.5, -3, 0.5, -6.5],
})
ACAD_ISO07W100.add({
  lineAngle: 0,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 5,
  dashLengthItems: [-34, 0.5, -3],
})
PredefinedHatchPatterns.set('ACAD_ISO07W100', ACAD_ISO07W100)
const ACAD_ISO08W100 = new HatchPattern('ACAD_ISO08W100')
ACAD_ISO08W100.add({
  lineAngle: 0,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 5,
  dashLengthItems: [0.5, -3],
})
PredefinedHatchPatterns.set('ACAD_ISO08W100', ACAD_ISO08W100)
const ACAD_ISO09W100 = new HatchPattern('ACAD_ISO09W100')
ACAD_ISO09W100.add({
  lineAngle: 0,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 5,
  dashLengthItems: [24, -3, 6, -3],
})
PredefinedHatchPatterns.set('ACAD_ISO09W100', ACAD_ISO09W100)
const ACAD_ISO10W100 = new HatchPattern('ACAD_ISO10W100')
ACAD_ISO10W100.add({
  lineAngle: 0,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 5,
  dashLengthItems: [24, -3, 6, -3, 6, -3],
})
PredefinedHatchPatterns.set('ACAD_ISO10W100', ACAD_ISO10W100)
const ACAD_ISO11W100 = new HatchPattern('ACAD_ISO11W100')
ACAD_ISO11W100.add({
  lineAngle: 0,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 5,
  dashLengthItems: [12, -3, 0.5, -3],
})
PredefinedHatchPatterns.set('ACAD_ISO11W100', ACAD_ISO11W100)
const ACAD_ISO12W100 = new HatchPattern('ACAD_ISO12W100')
ACAD_ISO12W100.add({
  lineAngle: 0,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 5,
  dashLengthItems: [12, -3, 12, -3, 0.5, -3],
})
PredefinedHatchPatterns.set('ACAD_ISO12W100', ACAD_ISO12W100)
const ACAD_ISO13W100 = new HatchPattern('ACAD_ISO13W100')
ACAD_ISO13W100.add({
  lineAngle: 0,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 5,
  dashLengthItems: [12, -3, 0.5, -3, 0.5, -3],
})
PredefinedHatchPatterns.set('ACAD_ISO13W100', ACAD_ISO13W100)
const ACAD_ISO14W100 = new HatchPattern('ACAD_ISO14W100')
ACAD_ISO14W100.add({
  lineAngle: 0,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 5,
  dashLengthItems: [12, -3, 12, -3, 0.5, -6.5],
})
ACAD_ISO14W100.add({
  lineAngle: 0,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 5,
  dashLengthItems: [-33.5, 0.5, -3],
})
PredefinedHatchPatterns.set('ACAD_ISO14W100', ACAD_ISO14W100)
const ACAD_ISO15W100 = new HatchPattern('ACAD_ISO15W100')
ACAD_ISO15W100.add({
  lineAngle: 0,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 5,
  dashLengthItems: [12, -3, 0.5, -3, 0.5, -6.5],
})
ACAD_ISO15W100.add({
  lineAngle: 0,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 5,
  dashLengthItems: [-22, 0.5, -3],
})
PredefinedHatchPatterns.set('ACAD_ISO15W100', ACAD_ISO15W100)
const JIS_LC_20 = new HatchPattern('JIS_LC_20')
JIS_LC_20.add({
  lineAngle: 0,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 5,
  dashLengthItems: [12, -3, 12, -3, 0.5, -10],
})
JIS_LC_20.add({
  lineAngle: 0,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 5,
  dashLengthItems: [-33.5, 0.5, -3, 0.5, -3],
})
PredefinedHatchPatterns.set('JIS_LC_20', JIS_LC_20)
const JIS_LC_20A = new HatchPattern('JIS_LC_20A')
JIS_LC_20A.add({
  lineAngle: 45,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 20,
  dashLengthItems: [],
})
JIS_LC_20A.add({
  lineAngle: 45,
  x: 0.4,
  y: 0,
  offsetX: 0,
  offsetY: 20,
  dashLengthItems: [],
})
PredefinedHatchPatterns.set('JIS_LC_20A', JIS_LC_20A)
const JIS_LC_8 = new HatchPattern('JIS_LC_8')
JIS_LC_8.add({
  lineAngle: 45,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 20,
  dashLengthItems: [],
})
JIS_LC_8.add({
  lineAngle: 45,
  x: 1,
  y: 0,
  offsetX: 0,
  offsetY: 20,
  dashLengthItems: [],
})
PredefinedHatchPatterns.set('JIS_LC_8', JIS_LC_8)
const JIS_LC_8A = new HatchPattern('JIS_LC_8A')
JIS_LC_8A.add({
  lineAngle: 45,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 7.8,
  dashLengthItems: [],
})
JIS_LC_8A.add({
  lineAngle: 45,
  x: 0.4,
  y: 0,
  offsetX: 0,
  offsetY: 7.8,
  dashLengthItems: [],
})
PredefinedHatchPatterns.set('JIS_LC_8A', JIS_LC_8A)
const JIS_RC_10 = new HatchPattern('JIS_RC_10')
JIS_RC_10.add({
  lineAngle: 45,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 7.8,
  dashLengthItems: [],
})
JIS_RC_10.add({
  lineAngle: 45,
  x: 1,
  y: 0,
  offsetX: 0,
  offsetY: 7.8,
  dashLengthItems: [],
})
PredefinedHatchPatterns.set('JIS_RC_10', JIS_RC_10)
const JIS_RC_15 = new HatchPattern('JIS_RC_15')
JIS_RC_15.add({
  lineAngle: 45,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 10,
  dashLengthItems: [],
})
JIS_RC_15.add({
  lineAngle: 45,
  x: 0.725,
  y: 0,
  offsetX: 0,
  offsetY: 10,
  dashLengthItems: [],
})
JIS_RC_15.add({
  lineAngle: 45,
  x: 1.45,
  y: 0,
  offsetX: 0,
  offsetY: 10,
  dashLengthItems: [],
})
PredefinedHatchPatterns.set('JIS_RC_15', JIS_RC_15)
const JIS_RC_18 = new HatchPattern('JIS_RC_18')
JIS_RC_18.add({
  lineAngle: 45,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 15,
  dashLengthItems: [],
})
JIS_RC_18.add({
  lineAngle: 45,
  x: 0.725,
  y: 0,
  offsetX: 0,
  offsetY: 15,
  dashLengthItems: [],
})
JIS_RC_18.add({
  lineAngle: 45,
  x: 1.45,
  y: 0,
  offsetX: 0,
  offsetY: 15,
  dashLengthItems: [],
})
PredefinedHatchPatterns.set('JIS_RC_18', JIS_RC_18)
const JIS_RC_30 = new HatchPattern('JIS_RC_30')
JIS_RC_30.add({
  lineAngle: 45,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 18,
  dashLengthItems: [],
})
JIS_RC_30.add({
  lineAngle: 45,
  x: 1,
  y: 0,
  offsetX: 0,
  offsetY: 18,
  dashLengthItems: [],
})
JIS_RC_30.add({
  lineAngle: 45,
  x: 2,
  y: 0,
  offsetX: 0,
  offsetY: 18,
  dashLengthItems: [],
})
PredefinedHatchPatterns.set('JIS_RC_30', JIS_RC_30)
const JIS_STN_1E = new HatchPattern('JIS_STN_1E')
JIS_STN_1E.add({
  lineAngle: 45,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 30,
  dashLengthItems: [],
})
JIS_STN_1E.add({
  lineAngle: 45,
  x: 1,
  y: 0,
  offsetX: 0,
  offsetY: 30,
  dashLengthItems: [],
})
JIS_STN_1E.add({
  lineAngle: 45,
  x: 2,
  y: 0,
  offsetX: 0,
  offsetY: 30,
  dashLengthItems: [],
})
PredefinedHatchPatterns.set('JIS_STN_1E', JIS_STN_1E)
const JIS_STN_2_5 = new HatchPattern('JIS_STN_2_5')
JIS_STN_2_5.add({
  lineAngle: 45,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 1,
  dashLengthItems: [],
})
JIS_STN_2_5.add({
  lineAngle: 45,
  x: 0.705,
  y: 0,
  offsetX: 0,
  offsetY: 1,
  dashLengthItems: [1, -0.5],
})
PredefinedHatchPatterns.set('JIS_STN_2_5', JIS_STN_2_5)
const JIS_WOOD = new HatchPattern('JIS_WOOD')
JIS_WOOD.add({
  lineAngle: 45,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 2.5,
  dashLengthItems: [],
})
JIS_WOOD.add({
  lineAngle: 45,
  x: 1.765,
  y: 0,
  offsetX: 0,
  offsetY: 2.5,
  dashLengthItems: [1.2, -0.5],
})
PredefinedHatchPatterns.set('JIS_WOOD', JIS_WOOD)
const LINE = new HatchPattern('LINE')
LINE.add({
  lineAngle: 45,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 0.70710678,
  dashLengthItems: [],
})
PredefinedHatchPatterns.set('LINE', LINE)
const MUDST = new HatchPattern('MUDST')
MUDST.add({
  lineAngle: 0,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 3.175,
  dashLengthItems: [],
})
PredefinedHatchPatterns.set('MUDST', MUDST)
const NET = new HatchPattern('NET')
NET.add({
  lineAngle: 0,
  x: 0,
  y: 0,
  offsetX: 12.7,
  offsetY: 6.35,
  dashLengthItems: [6.35, -6.35, 0, -6.35, 0, -6.35],
})
PredefinedHatchPatterns.set('NET', NET)
const NET3 = new HatchPattern('NET3')
NET3.add({
  lineAngle: 0,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 3.175,
  dashLengthItems: [],
})
NET3.add({
  lineAngle: 90,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 3.175,
  dashLengthItems: [],
})
PredefinedHatchPatterns.set('NET3', NET3)
const PLAST = new HatchPattern('PLAST')
PLAST.add({
  lineAngle: 0,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 3.175,
  dashLengthItems: [],
})
PLAST.add({
  lineAngle: 60,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 3.175,
  dashLengthItems: [],
})
PLAST.add({
  lineAngle: 120,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 3.175,
  dashLengthItems: [],
})
PredefinedHatchPatterns.set('PLAST', PLAST)
const PLASTI = new HatchPattern('PLASTI')
PLASTI.add({
  lineAngle: 0,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 6.35,
  dashLengthItems: [],
})
PLASTI.add({
  lineAngle: 0,
  x: 0,
  y: 0.79375,
  offsetX: 0,
  offsetY: 6.35,
  dashLengthItems: [],
})
PLASTI.add({
  lineAngle: 0,
  x: 0,
  y: 1.5875,
  offsetX: 0,
  offsetY: 6.35,
  dashLengthItems: [],
})
PredefinedHatchPatterns.set('PLASTI', PLASTI)
const SACNCR = new HatchPattern('SACNCR')
SACNCR.add({
  lineAngle: 0,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 6.35,
  dashLengthItems: [],
})
SACNCR.add({
  lineAngle: 0,
  x: 0,
  y: 0.79375,
  offsetX: 0,
  offsetY: 6.35,
  dashLengthItems: [],
})
SACNCR.add({
  lineAngle: 0,
  x: 0,
  y: 1.5875,
  offsetX: 0,
  offsetY: 6.35,
  dashLengthItems: [],
})
SACNCR.add({
  lineAngle: 0,
  x: 0,
  y: 3.96875,
  offsetX: 0,
  offsetY: 6.35,
  dashLengthItems: [],
})
PredefinedHatchPatterns.set('SACNCR', SACNCR)
const SQUARE = new HatchPattern('SQUARE')
SQUARE.add({
  lineAngle: 45,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 2.38125,
  dashLengthItems: [],
})
SQUARE.add({
  lineAngle: 45,
  x: 1.6838,
  y: 0,
  offsetX: 0,
  offsetY: 2.38125,
  dashLengthItems: [0, -2.38125],
})
PredefinedHatchPatterns.set('SQUARE', SQUARE)
const STARS = new HatchPattern('STARS')
STARS.add({
  lineAngle: 0,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 3.175,
  dashLengthItems: [3.175, -3.175],
})
STARS.add({
  lineAngle: 90,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 3.175,
  dashLengthItems: [3.175, -3.175],
})
PredefinedHatchPatterns.set('STARS', STARS)
const STEEL = new HatchPattern('STEEL')
STEEL.add({
  lineAngle: 0,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 5.4992613154,
  dashLengthItems: [3.175, -3.175],
})
STEEL.add({
  lineAngle: 60,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 5.4992613154,
  dashLengthItems: [3.175, -3.175],
})
STEEL.add({
  lineAngle: 120,
  x: 1.5875,
  y: 2.7496306704,
  offsetX: 0,
  offsetY: 5.4992613154,
  dashLengthItems: [3.175, -3.175],
})
PredefinedHatchPatterns.set('STEEL', STEEL)
const SWAMP = new HatchPattern('SWAMP')
SWAMP.add({
  lineAngle: 45,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 3.175,
  dashLengthItems: [],
})
SWAMP.add({
  lineAngle: 45,
  x: 0,
  y: 1.5875,
  offsetX: 0,
  offsetY: 3.175,
  dashLengthItems: [],
})
PredefinedHatchPatterns.set('SWAMP', SWAMP)
const TRANS = new HatchPattern('TRANS')
TRANS.add({
  lineAngle: 0,
  x: 0,
  y: 0,
  offsetX: 12.7,
  offsetY: 21.9970452362,
  dashLengthItems: [3.175, -22.225],
})
TRANS.add({
  lineAngle: 90,
  x: 1.5875,
  y: 0,
  offsetX: 21.9970452362,
  offsetY: 12.7,
  dashLengthItems: [1.5875, -42.4065904724],
})
TRANS.add({
  lineAngle: 90,
  x: 1.984375,
  y: 0,
  offsetX: 21.9970452362,
  offsetY: 12.7,
  dashLengthItems: [1.27, -42.7240904724],
})
TRANS.add({
  lineAngle: 90,
  x: 1.190625,
  y: 0,
  offsetX: 21.9970452362,
  offsetY: 12.7,
  dashLengthItems: [1.27, -42.7240904724],
})
TRANS.add({
  lineAngle: 60,
  x: 2.38125,
  y: 0,
  offsetX: 12.7,
  offsetY: 21.9970452362,
  dashLengthItems: [1.016, -24.384],
})
TRANS.add({
  lineAngle: 120,
  x: 0.79375,
  y: 0,
  offsetX: 12.7,
  offsetY: 21.9970452362,
  dashLengthItems: [1.016, -24.384],
})
PredefinedHatchPatterns.set('TRANS', TRANS)
const TRIANG = new HatchPattern('TRIANG')
TRIANG.add({
  lineAngle: 0,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 6.35,
  dashLengthItems: [],
})
TRIANG.add({
  lineAngle: 0,
  x: 0,
  y: 3.175,
  offsetX: 0,
  offsetY: 6.35,
  dashLengthItems: [3.175, -3.175],
})
PredefinedHatchPatterns.set('TRIANG', TRIANG)
const ZIGZAG = new HatchPattern('ZIGZAG')
ZIGZAG.add({
  lineAngle: 60,
  x: 0,
  y: 0,
  offsetX: 4.7625,
  offsetY: 8.2488919604,
  dashLengthItems: [4.7625, -4.7625],
})
ZIGZAG.add({
  lineAngle: 120,
  x: 0,
  y: 0,
  offsetX: 4.7625,
  offsetY: 8.2488919604,
  dashLengthItems: [4.7625, -4.7625],
})
ZIGZAG.add({
  lineAngle: 0,
  x: -2.38125,
  y: 4.1244459802,
  offsetX: 4.7625,
  offsetY: 8.2488919604,
  dashLengthItems: [4.7625, -4.7625],
})
PredefinedHatchPatterns.set('ZIGZAG', ZIGZAG)

export default PredefinedHatchPatterns
