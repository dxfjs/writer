import { vec2_t, vec3_t } from './Helpers'

export type tag_t = {
	code: number;
	value: number | string;
};

export class Dxfier {
  readonly lines: (string | number)[]
  constructor() {
    this.lines = []
  }

  push(code: number, value?: string | number) {
    if (value != null) this.lines.push(code, value)
  }

  stringify() {
    return this.lines.join('\u000A')
  }

  start(name: string) {
    this.push(0, 'SECTION')
    this.push(2, name)
  }

  end() {
    this.push(0, 'ENDSEC')
  }

  variableName(name: string) {
    this.push(9, name)
  }

  type(entityType: string) {
    this.push(0, entityType)
  }

  primaryText(primaryText: string) {
    this.push(1, primaryText)
  }

  name(name: string, code = 2) {
    this.push(code, name)
  }

  handle(handle: string) {
    this.push(5, handle)
  }

  lineType(lineType?: string) {
    this.push(6, lineType)
  }

  textStyle(textStyle: string) {
    this.push(7, textStyle)
  }

  layerName(layerName?: string) {
    this.push(8, layerName)
  }

  point2d(point?: vec2_t, digit = 0) {
    this.push(10 + digit, point?.x)
    this.push(20 + digit, point?.y)
  }

  point3d(point?: vec3_t, digit = 0) {
    this.point2d(point, digit)
    this.push(30 + digit, point?.z)
  }

  elevation(elevation?: number) {
    this.push(38, elevation)
  }

  thickness(thickness?: number) {
    this.push(39, thickness)
  }

  visibilty(visibilty?: boolean) {
    if (visibilty != null) this.push(60, visibilty ? 0 : 1)
  }

  colorNumber(colorNumber?: number) {
    this.push(62, colorNumber)
  }

  subclassMarker(subclassMarker?: string) {
    this.push(100, subclassMarker)
  }
}
