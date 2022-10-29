import { Dxfier } from 'Internals/Dxfier'
import DxfRecord from './DxfRecord'

export default class DxfVPort extends DxfRecord {
  readonly name: string
  viewHeight: number
  viewCenter: [number, number]

  constructor(name: string) {
    super('VPORT')
    this.name = name
    this.viewHeight = 200
    this.viewCenter = [0, 0]
  }

  override dxfy(dx: Dxfier): void {
    super.dxfy(dx)
    const [x, y] = this.viewCenter
    dx.subclassMarker('AcDbViewportTableRecord')
    dx.name(this.name)
    dx.push(70, 0)
    dx.point2d({ x: 0, y: 0 })
    dx.push(11, 1)
    dx.push(21, 1)
    dx.push(12, x)
    dx.push(22, y)
    dx.push(13, 0)
    dx.push(23, 0)
    dx.push(14, 10)
    dx.push(24, 10)
    dx.push(15, 10)
    dx.push(25, 10)
    dx.push(16, 0)
    dx.push(26, 0)
    dx.push(36, 1)
    dx.push(17, 0)
    dx.push(27, 0)
    dx.push(37, 0)
    dx.push(40, this.viewHeight)
    dx.push(41, 2) // TODO ?????????
    dx.push(42, 50)
    dx.push(43, 0)
    dx.push(44, 0)
    dx.push(50, 0)
    dx.push(51, 0)
    dx.push(71, 0)
    dx.push(72, 100)
    dx.push(73, 1)
    dx.push(74, 3)
    dx.push(75, 0)
    dx.push(76, 1)
    dx.push(77, 0)
    dx.push(78, 0)
    dx.push(281, 0)
    dx.push(65, 1)
    dx.push(110, 0)
    dx.push(120, 0)
    dx.push(130, 0)
    dx.push(111, 1)
    dx.push(121, 0)
    dx.push(131, 0)
    dx.push(112, 0)
    dx.push(122, 1)
    dx.push(132, 0)
    dx.push(79, 0)
    dx.push(146, 0)
    dx.push(348, 10020)
    dx.push(60, 7)
    dx.push(61, 5)
    dx.push(292, 1)
    dx.push(282, 1)
    dx.push(141, 0)
    dx.push(142, 0)
    dx.push(63, 250)
    dx.push(421, 3358443)
  }
}
