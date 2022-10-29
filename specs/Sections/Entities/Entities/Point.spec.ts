import { describe, expect, it } from 'vitest'
import { Dxfier } from 'Internals/Dxfier'
import { Point } from 'EntitiesSection/Entities/Point'

describe('Point', () => {
  const dataState = {
    instancesCount: 0,
  }

  it('should the given parameters.', () => {
    const entity = new Point(
      10.658,
      4.54878854,
      0.00214,
      {}
    )
    dataState.instancesCount++
    expect(entity.x).toBe(10.658)
    expect(entity.y).toBe(4.54878854)
    expect(entity.z).toBe(0.00214)
  })

  it('should return the correct dxf string.', () => {
    const entity = new Point(24445787874545.336, 47854548454.54874, 0.14111122215556, {})
    dataState.instancesCount++
    const handle = dataState.instancesCount.toString(16).toUpperCase()
    let entityString = `0\nPOINT\n5\n${handle}\n100\nAcDbEntity\n8\n0\n100\nAcDbPoint\n`
    entityString += '10\n24445787874545.336\n20\n47854548454.54874\n30\n0.14111122215556'
    const dx = new Dxfier()
    entity.dxfy(dx)
    expect(dx.stringify()).toBe(entityString)
  })
})
