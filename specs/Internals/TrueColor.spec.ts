import { describe, expect, it } from 'vitest'
import TrueColor from '../../src/Internals/TrueColor'

describe('TrueColor class', () => {
  it('The fromHex() should return the coorect decimal', () => {
    let trueColor = TrueColor.fromHex('0x00C86432')
    expect(trueColor).toBe(13132850)

    trueColor = TrueColor.fromHex('#C86432')
    expect(trueColor).toBe(13132850)

    trueColor = TrueColor.fromHex('C86432')
    expect(trueColor).toBe(13132850)
  })

  it('The fromRGB() should return the coorect decimal', () => {
    const trueColor = TrueColor.fromRGB(200, 100, 50)
    expect(trueColor).toBe(13132850)
  })
})
