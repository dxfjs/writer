import { BoundingBox, boundingBox_t } from 'Internals/BoundingBox'
import { point3d, vec3_t } from 'Internals/Helpers'
import { DxfInterface } from 'Internals/Interfaces/DxfInterface'
import { DxfLayer } from 'TablesSection/Tables/Records/DxfLayer'
import { Dxfier } from 'Internals/Dxfier'
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
  layerName?: string
  visible?: boolean
  lineType?: string
  lineTypeScale?: number
  extrusion?: vec3_t
  readonly handle: string

  /**
   * Entity class is the base class of all enities.
   * @param type - The type of the entity example : LINE, POLYLINE, ....
   * @param subclassMarker - The subclass marker of the entity.
   * @param options - The common options of all entities.
   */
  public constructor(type: string, subclassMarker?: string, options?: CommonEntityOptions) {
    this.type = type
    this.subclassMarker = subclassMarker
    this.layerName = options?.layerName
    this.handle = Handle.next()
    this.trueColor = options?.trueColor
    this.colorNumber = options?.colorNumber
    this.visible = options?.visible
    this.lineType = options?.lineType
    this.lineTypeScale = options?.lineTypeScale
    this.extrusion = options?.extrusion
  }

  /**
   * Get the boundingBox of an entity.
   * @returns The boundingBox of an entity.
   */
  public boundingBox(): boundingBox_t {
    return BoundingBox.pointBBox(point3d())
  }

  dxfy(dx: Dxfier) {
    dx.type(this.type)
    dx.handle(this.handle)
    dx.push(330, this.ownerBlockRecord)
    dx.subclassMarker('AcDbEntity')
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
  }
}
