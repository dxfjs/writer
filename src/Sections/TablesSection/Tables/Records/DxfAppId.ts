import { Dxfier } from 'Internals/Dxfier'
import DxfRecord from './DxfRecord'

export enum AppIdFlags {
	None = 0,
	XRefDependent = 16,
	XRefResolved = 32,
}

export default class DxfAppId extends DxfRecord {
  name: string
  flags: AppIdFlags

  public constructor(name: string, flags?: AppIdFlags) {
    super('APPID')
    this.name = name
    this.flags = flags ?? AppIdFlags.None
  }

  override dxfy(dx: Dxfier) {
    super.dxfy(dx)
    dx.subclassMarker('AcDbRegAppTableRecord')
    dx.name(this.name)
    dx.push(70, this.flags)
  }
}
