import { Dxfier } from './Dxfier'

export interface DxfInterface {
  dxfy(dx: Dxfier): void
}

export interface DxfTag {
	code: number
	value: number | string
}
