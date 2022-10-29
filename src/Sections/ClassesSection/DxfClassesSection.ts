import { Dxfier } from 'Internals/Dxfier'
import DxfInterface from 'Internals/Interfaces/DxfInterface'

export default class DxfClassesSection implements DxfInterface {
  dxfy(dx: Dxfier) {
    dx.start('CLASSES')
    dx.end()
  }
}
