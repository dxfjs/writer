import { DxfInterface, DxfTag } from './Interfaces'
import { stringChunksSplit, tag } from './Functions'
import { Dxfier } from './Dxfier'
import { vec3_t } from './Helpers'

export class ExtendedData implements DxfInterface {
  name: string

  #tags: DxfTag[]

  constructor(name: string) {
    this.name = name
    this.#tags = []
  }

  clear() {
    this.#tags.length = 0
  }

  string(string: string) {
    stringChunksSplit(string).forEach((chunk) =>
      this.#tags.push(tag(1000, chunk))
    )
  }

  beginList() {
    this.#tags.push(tag(1002, '{'))
  }

  endList() {
    this.#tags.push(tag(1002, '}'))
  }

  layerName(name: string) {
    this.#tags.push(tag(1003, name))
  }

  binaryData(data: string) {
    stringChunksSplit(data).forEach((chunk) =>
      this.#tags.push(tag(1004, chunk))
    )
  }

  databaseHandle(handle: string) {
    this.#tags.push(tag(1005, handle))
  }

  point(point: vec3_t) {
    this.#tags.push(tag(1010, point.x))
    this.#tags.push(tag(1020, point.y))
    this.#tags.push(tag(1030, point.z))
  }

  position(position: vec3_t) {
    this.#tags.push(tag(1011, position.x))
    this.#tags.push(tag(1021, position.y))
    this.#tags.push(tag(1031, position.z))
  }

  displacement(displacement: vec3_t) {
    this.#tags.push(tag(1012, displacement.x))
    this.#tags.push(tag(1022, displacement.y))
    this.#tags.push(tag(1032, displacement.z))
  }

  direction(direction: vec3_t) {
    this.#tags.push(tag(1013, direction.x))
    this.#tags.push(tag(1023, direction.y))
    this.#tags.push(tag(1033, direction.z))
  }

  real(real: number) {
    this.#tags.push(tag(1040, real))
  }

  distance(distance: number) {
    this.#tags.push(tag(1041, distance))
  }

  scale(scale: number) {
    this.#tags.push(tag(1042, scale))
  }

  integer(integer: number) {
    this.#tags.push(tag(1070, integer))
  }

  long(long: number) {
    this.#tags.push(tag(1071, long))
  }

  dxfy(dx: Dxfier): void {
    dx.push(1001, this.name)
    dx.push(1002, '{')
    this.#tags.forEach((t) => dx.push(t.code, t.value))
    dx.push(1002, '}')
  }
}
