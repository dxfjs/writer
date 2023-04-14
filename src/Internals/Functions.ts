import { DxfTag } from './Interfaces'

export function tag(code: number, value: number | string): DxfTag {
  return { code, value }
}

export function stringByteSize(value: string) {
  return new Blob([value]).size
}

export function stringChunksSplit(value: string, length = 255) {
  const chunks: string[] = []
  const tempChunk: string[] = []
  for (let i = 0; i < value.length; i++) {
    const char = value[i]
    if (tempChunk.length === length || i === value.length - 1) {
      chunks.push(tempChunk.join(''))
      tempChunk.length = 0
    } else tempChunk.push(char)
  }
  return chunks
}
