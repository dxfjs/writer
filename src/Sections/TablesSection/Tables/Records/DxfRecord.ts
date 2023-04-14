import { DxfInterface } from 'Internals/Interfaces'
import { Dxfier } from 'Internals/Dxfier'
import Handle from 'Internals/Handle'

export enum LayerFlags {
	None = 0,
	Frozen = 1,
	FrozenInNewViewports = 2,
	Locked = 4,
	XRefDependent = 16,
	XRefResolved = 32,
}

export enum StyleFlags {
	None = 0,
	DescribeShape = 1,
	VerticalText = 4,
	XRefDependent = 16,
	XRefResolved = 32,
}

export enum ViewFlags {
	None = 0,
	PaperSpace = 1,
	XRefDependent = 16,
	XRefResolved = 32,
}

export default class DxfRecord implements DxfInterface {
  readonly type: string
  readonly handle: string
  ownerObjectHandle?: string

  constructor(type: string) {
    this.type = type
    this.handle = Handle.next()
  }

  dxfy(dx: Dxfier) {
    dx.type(this.type)
    dx.handle(this.handle)
    dx.push(330, this.ownerObjectHandle)
    dx.subclassMarker('AcDbSymbolTableRecord')
  }
}
