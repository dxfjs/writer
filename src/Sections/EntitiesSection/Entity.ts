import { BoundingBox, boundingBox_t } from 'Internals/BoundingBox'
import { point3d, vec3_t } from 'Internals/Helpers'
import { DxfInterface } from 'Internals/Interfaces'
import { DxfLayer } from 'TablesSection/Tables/Records/DxfLayer'
import { Dxfier } from 'Internals/Dxfier'
import { ExtendedData } from 'Internals'
import Handle from 'Internals/Handle'

export interface CommonEntityOptions {
  trueColor?: string;
  colorNumber?: number;
  extrusion?: vec3_t;
  layerName?: string;
  visible?: boolean;
  lineType?: string;
  lineTypeScale?: number;
}

export default abstract class Entity implements DxfInterface {
  type: string
  protected subclassMarker: string | undefined
  ownerBlockRecord?: string
  trueColor?: string
  colorNumber?: number
  inPaperSpace: boolean
  layerName?: string
  visible?: boolean
  lineType?: string
  lineTypeScale?: number
  extrusion?: vec3_t
  readonly handle: string

  readonly xdatas: ExtendedData[]

  /**
   * Entity class is the base class of all enities.
   * @param type - The type of the entity example : LINE, POLYLINE, ....
   * @param subclassMarker - The subclass marker of the entity.
   * @param options - The common options of all entities.
   */
  public constructor(
    type: string,
    subclassMarker?: string,
    options?: CommonEntityOptions
  ) {
    this.type = type
    this.subclassMarker = subclassMarker
    this.layerName = options?.layerName
    this.handle = Handle.next()
    this.trueColor = options?.trueColor
    this.inPaperSpace = false
    this.colorNumber = options?.colorNumber
    this.visible = options?.visible
    this.lineType = options?.lineType
    this.lineTypeScale = options?.lineTypeScale
    this.extrusion = options?.extrusion

    this.xdatas = []
  }

  /**
   * Get the boundingBox of an entity.
   * @returns The boundingBox of an entity.
   */
  boundingBox(): boundingBox_t {
    return BoundingBox.pointBBox(point3d())
  }

  addXData(name: string) {
    const xdata = new ExtendedData(name)
    this.xdatas.push(xdata)
    return xdata
  }

  protected abstract dxfyChild(dx: Dxfier): void

  dxfy(dx: Dxfier) {
    dx.type(this.type)
    dx.handle(this.handle)
    dx.push(330, this.ownerBlockRecord)
    dx.subclassMarker('AcDbEntity')
    if(this.inPaperSpace) dx.push(67, Number(this.inPaperSpace))
    dx.push(420, this.trueColor)
    dx.layerName(this.layerName || DxfLayer.layerZeroName)
    dx.lineType(this.lineType)
    dx.colorNumber(this.colorNumber)
    dx.push(48, this.lineTypeScale)
    dx.visibilty(this.visible)
    dx.subclassMarker(this.subclassMarker)
    dx.push(210, this.extrusion?.x)
    dx.push(220, this.extrusion?.y)
    dx.push(230, this.extrusion?.z)
    this.dxfyChild(dx)
    this.xdatas.forEach(xdata => xdata.dxfy(dx))
  }
}
