import { describe, expect, it } from 'vitest'
import { Dxfier } from 'Internals/Dxfier'
import DxfVariable from 'HeaderSection/DxfVariable'

describe('DxfHeader class', () => {
  const header = new DxfVariable('$ACADVER', { 1: 'AC1021' })

  it('Defines dxfy()', () => {
    expect(typeof header.dxfy).toBe('function')
  })

  it('Should have correct name and values', () => {
    expect(header.name).toBe('$ACADVER')
    expect(header.values).toEqual({ 1: 'AC1021' })
  })

  it('Should return correct dxf string', () => {
    const dx = new Dxfier()
    header.dxfy(dx)
    expect(dx.stringify()).toBe('9\n$ACADVER\n1\nAC1021')
  })
})
