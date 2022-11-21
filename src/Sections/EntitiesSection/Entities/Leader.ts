import { BoundingBox, boundingBox_t } from 'Internals/BoundingBox'
import Entity, { CommonEntityOptions } from '../Entity'
import { Dxfier } from 'Internals/Dxfier'
import { vec3_t } from 'Internals/Helpers'

export enum ArrowHeadFlag {
  Disabed = 0,
  Enabled = 1,
}

export enum LeaderPathType {
  StraightLine = 0,
  Spline = 1,
}

export interface LeaderOptions extends CommonEntityOptions {
  flag?: ArrowHeadFlag
  leaderPathType?: LeaderPathType
  dimensionStyleName?: string
}

export class Leader extends Entity {
  flag: ArrowHeadFlag
  leaderPathType: LeaderPathType
  dimensionStyleName: string
  vertices: vec3_t[]

  public constructor(vertices: vec3_t[], options?: LeaderOptions) {
    super('LEADER', 'AcDbLeader', options)
    this.vertices = vertices
    this.flag = options?.flag ?? ArrowHeadFlag.Enabled
    this.leaderPathType = options?.leaderPathType ?? LeaderPathType.StraightLine
    this.dimensionStyleName = options?.dimensionStyleName || 'Standard'
  }

  override boundingBox(): boundingBox_t {
    return BoundingBox.verticesBBox(this.vertices)
  }

  override dxfy(dx: Dxfier): void {
    super.dxfy(dx)
    dx.push(3, this.dimensionStyleName)
    dx.push(71, this.flag)
    dx.push(72, this.leaderPathType)
    dx.push(76, this.vertices.length)
    this.vertices.forEach(vertex => dx.point3d(vertex))
  }
}
