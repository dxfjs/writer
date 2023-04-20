import { describe, expect, it } from 'vitest'

import { DxfHeaderSection } from 'HeaderSection/DxfHeaderSection'
import { Dxfier } from 'Internals/Dxfier'

describe('DxfHeader class', () => {
  const header = new DxfHeaderSection()

  it('Should have zero variable', () => {
    expect(header.variables.length).toBe(0)
  })

  it('Defines setVariable()', () => {
    expect(typeof header.setVariable).toBe('function')
  })

  it('The length of setVariable() is 2', () => {
    expect(header.setVariable.length).toBe(2)
  })

  it('Should add a new variable with correct informations', () => {
    header.setVariable('$ACADVER', { 1: 'AC1021' })
    expect(header.variables.length).toBe(1)
    const [variable] = header.variables
    expect(variable.name).toBe('$ACADVER')
    expect(variable.values).toEqual({ 1: 'AC1021' })
  })

  it('Should update the existing variable with correct informations', () => {
    header.setVariable('$ACADVER', { 1: 'AC1027' })
    expect(header.variables.length).toBe(1)
    const [variable] = header.variables
    expect(variable.name).toBe('$ACADVER')
    expect(variable.values).toEqual({ 1: 'AC1027' })
  })

  it('Should add another variable with correct informations', () => {
    header.setVariable('$EXTMAX', { 10: 0, 20: 0, 30: 1 })
    expect(header.variables.length).toBe(2)
    const [, variable] = header.variables
    expect(variable.name).toBe('$EXTMAX')
    expect(variable.values).toEqual({ 10: 0, 20: 0, 30: 1 })
  })

  it('Should update the second existing variable with correct informations', () => {
    header.setVariable('$EXTMAX', { 10: 10, 20: 20, 30: 31 })
    expect(header.variables.length).toBe(2)
    const [, variable] = header.variables
    expect(variable.name).toBe('$EXTMAX')
    expect(variable.values).toEqual({ 10: 10, 20: 20, 30: 31 })
  })

  it('Should return the correct dxf string', () => {
    const dx = new Dxfier()
    header.dxfy(dx)
    const dxfStr = dx.stringify()
    const expected =
      '0\nSECTION\n2\nHEADER\n9\n$ACADVER\n1\nAC1027\n9\n$EXTMAX\n10\n10\n20\n20\n30\n31\n0\nENDSEC'
    expect(dxfStr).toBe(expected)
  })
})
