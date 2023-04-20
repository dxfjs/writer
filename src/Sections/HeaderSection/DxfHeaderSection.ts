import { DxfInterface, Dxfier } from 'Internals'
import {DxfVariable,  values_t } from './DxfVariable'

export class DxfHeaderSection implements DxfInterface {
  readonly variables: DxfVariable[] = []

  setVariable(name: string, values: values_t) {
    const variable = this.variables.find((v) => v.name === name)
    if (variable) {
      variable.values = values
    } else {
      this.variables.push(new DxfVariable(name, values))
    }
  }

  dxfy(dx: Dxfier) {
    dx.start('HEADER')
    this.variables.forEach(variable => variable.dxfy(dx))
    dx.end()
  }
}
