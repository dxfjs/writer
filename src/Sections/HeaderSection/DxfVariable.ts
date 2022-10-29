import { Dxfier } from 'Internals/Dxfier'
import DxfInterface from 'Internals/Interfaces/DxfInterface'

/**
 * This is the type for variable values.
 *
 * @example
 * ```js
 * const values = {
 * 	10: 350,
 * 	20: 145,
 * 	30: 0
 * }
 * // 10,20 and 30 represent the groupCodes.
 * // 350,145 and 0 represent the values.
 * ```
 */
export type values_t = {
	[code: number]: number | string;
};

export default class DxfVariable implements DxfInterface {
  readonly name: string
  values: values_t

  constructor(name: string, values: values_t) {
    this.values = values
    this.name = name
  }

  dxfy(dx: Dxfier) {
    dx.variable(this.name)
    const entries = Object.entries(this.values)
    for (const entry of entries) {
      const [code, value] = entry
      dx.push(parseInt(code), value)
    }
  }
}
