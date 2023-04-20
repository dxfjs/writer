import { DxfInterface } from 'Internals/Interfaces'
import { Dxfier } from 'Internals/Dxfier'
import Handle from 'Internals/Handle'

export enum DimStyleFlags {
	None = 0,
	XRefDependent = 16,
	XRefRefesolved = 32,
}

export class DxfDimStyle implements DxfInterface {
  name: string
  flags: DimStyleFlags
  readonly handle: string
  ownerObjectHandle?: string
  readonly type: string
  DIMPOST?: string
  DIMAPOST?: string
  DIMSCALE?: number
  DIMASZ?: number
  DIMEXO?: number
  DIMDLI?: number
  DIMEXE?: number
  DIMRND?: number
  DIMDLE?: number
  DIMTP?: number
  DIMTM?: number
  DIMTXT?: number
  DIMCEN?: number
  DIMTSZ?: number
  DIMALTF?: number
  DIMLFAC?: number
  DIMTVP?: number
  DIMTFAC?: number
  DIMGAP?: number
  DIMALTRND?: number
  DIMTOL?: number
  DIMLIM?: number
  DIMTIH?: number
  DIMTOH?: number
  DIMSE1?: number
  DIMSE2?: number
  DIMTAD?: number
  DIMZIN?: number
  DIMAZIN?: number
  DIMALT?: number
  DIMALTD?: number
  DIMTOFL?: number
  DIMSAH?: number
  DIMTIX?: number
  DIMSOXD?: number
  DIMCLRD?: number
  DIMCLRE?: number
  DIMCLRT?: number
  DIMADEC?: number
  DIMDEC?: number
  DIMTDEC?: number
  DIMALTU?: number
  DIMALTTD?: number
  DIMAUNIT?: number
  DIMFRAC?: number
  DIMLUNIT?: number
  DIMDSEP?: number
  DIMTMOVE?: number
  DIMJUST?: number
  DIMSD1?: number
  DIMSD2?: number
  DIMTOLJ?: number
  DIMTZIN?: number
  DIMALTZ?: number
  DIMALTTZ?: number
  DIMFIT?: number
  DIMUPT?: number
  DIMATFIT?: number
  DIMTXSTY?: string
  DIMLDRBLK?: string
  DIMBLK?: string
  DIMBLK1?: string
  DIMBLK2?: string
  DIMLWD?: number
  DIMLWE?: number

  constructor(name: string, flags?: DimStyleFlags) {
    this.name = name
    this.flags = flags ?? DimStyleFlags.None
    this.handle = Handle.next()
    this.type = 'DIMSTYLE'
  }

  dxfy(dx: Dxfier): void {
    dx.type(this.type)
    dx.push(105, this.handle)
    dx.push(330, this.ownerObjectHandle)
    dx.subclassMarker('AcDbSymbolTableRecord')
    dx.subclassMarker('AcDbDimStyleTableRecord')
    dx.name(this.name)
    dx.push(70, this.flags)
    dx.push(3, this.DIMPOST)
    dx.push(4, this.DIMAPOST)
    dx.push(5, this.DIMBLK)
    dx.push(6, this.DIMBLK1)
    dx.push(7, this.DIMBLK2)
    dx.push(40, this.DIMSCALE)
    dx.push(41, this.DIMASZ)
    dx.push(42, this.DIMEXO)
    dx.push(43, this.DIMDLI)
    dx.push(44, this.DIMEXE)
    dx.push(45, this.DIMRND)
    dx.push(46, this.DIMDLE)
    dx.push(47, this.DIMTP)
    dx.push(48, this.DIMTM)
    dx.push(140, this.DIMTXT)
    dx.push(141, this.DIMCEN)
    dx.push(142, this.DIMTSZ)
    dx.push(143, this.DIMALTF)
    dx.push(144, this.DIMLFAC)
    dx.push(145, this.DIMTVP)
    dx.push(146, this.DIMTFAC)
    dx.push(147, this.DIMGAP)
    dx.push(148, this.DIMALTRND)
    dx.push(71, this.DIMTOL)
    dx.push(72, this.DIMLIM)
    dx.push(73, this.DIMTIH)
    dx.push(74, this.DIMTOH)
    dx.push(75, this.DIMSE1)
    dx.push(76, this.DIMSE2)
    dx.push(77, this.DIMTAD)
    dx.push(78, this.DIMZIN)
    dx.push(79, this.DIMAZIN)
    dx.push(170, this.DIMALT)
    dx.push(171, this.DIMALTD)
    dx.push(172, this.DIMTOFL)
    dx.push(173, this.DIMSAH)
    dx.push(174, this.DIMTIX)
    dx.push(175, this.DIMSOXD)
    dx.push(176, this.DIMCLRD)
    dx.push(177, this.DIMCLRE)
    dx.push(178, this.DIMCLRT)
    dx.push(179, this.DIMADEC)
    dx.push(271, this.DIMDEC)
    dx.push(272, this.DIMTDEC)
    dx.push(273, this.DIMALTU)
    dx.push(274, this.DIMALTTD)
    dx.push(275, this.DIMAUNIT)
    dx.push(276, this.DIMFRAC)
    dx.push(277, this.DIMLUNIT)
    dx.push(278, this.DIMDSEP)
    dx.push(279, this.DIMTMOVE)
    dx.push(280, this.DIMJUST)
    dx.push(281, this.DIMSD1)
    dx.push(282, this.DIMSD2)
    dx.push(283, this.DIMTOLJ)
    dx.push(284, this.DIMTZIN)
    dx.push(285, this.DIMALTZ)
    dx.push(286, this.DIMALTTZ)
    dx.push(287, this.DIMFIT)
    dx.push(288, this.DIMUPT)
    dx.push(289, this.DIMATFIT)
    dx.push(340, this.DIMTXSTY)
    dx.push(341, this.DIMLDRBLK)
    dx.push(342, this.DIMBLK)
    dx.push(343, this.DIMBLK1)
    dx.push(344, this.DIMBLK2)
    dx.push(371, this.DIMLWD)
    dx.push(372, this.DIMLWE)
  }
}
