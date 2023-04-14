import { DxfInterface } from 'Internals/Interfaces'
import { Dxfier } from 'Internals/Dxfier'

export class DxfClassesSection implements DxfInterface {
  dxfy(dx: Dxfier) {
    dx.start('CLASSES')
    dx.end()
  }
}
