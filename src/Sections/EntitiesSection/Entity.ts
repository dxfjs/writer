import { BoundingBox, boundingBox_t } from 'Internals/BoundingBox'

import DxfInterface from 'Internals/Interfaces/DxfInterface'
import { DxfLayer } from 'TablesSection/Tables/Records/DxfLayer'
import { Dxfier } from 'Internals/Dxfier'
import Handle from 'Internals/Handle'
import { point3d, vec3_t } from 'Internals/Helpers'

export interface CommonEntityOptions {
  trueColor?: string;
  colorNumber?: number;
  /**
   * The extrusion is optional and defaults to 0,0,1. It could also be left empty.
   */
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
  /**
   * The extrusion is optional and defaults to 0,0,1. It could also be left empty.
   */
  extrusion?: vec3_t
  readonly handle: string

  /**
   * Entity class is the base class of all enities.
   * [DXF Entities](http://help.autodesk.com/view/OARX/2018/ENU/?guid=GUID-7D07C886-FD1D-4A0C-A7AB-B4D21F18E484)
   * @param type - The type of the entity example : LINE, POLYLINE, ARC, CIRCLE ....
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
  \* Get the boundingBox of an entity.
  \*
  \* @returns The boundingBox of an entity.
  \*/
  public boundingBox(): boundingBox_t {
    return BoundingBox.pointBBox(point3d(0, 0, 0))
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
    if (this.extrusion)
    {
      dx.push(210, this.extrusion.x)
      dx.push(220, this.extrusion.y)
      dx.push(230, this.extrusion.z)
    }
  }
}
