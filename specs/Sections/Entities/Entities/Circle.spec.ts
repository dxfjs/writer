import { describe, expect, it } from 'vitest'
import { point3d } from 'Internals/Helpers'
import { Dxfier } from 'Internals/Dxfier'
import { Circle } from 'EntitiesSection/Entities/Circle'

describe('Circle', () => {
  const dataState = {
    instancesCount: 0, // I increment this variable by 2 because we have 2 instantiations of Entity class (Arc and Point)
  }

  it('should return the center given.', () => {
    const entity = new Circle(point3d(10, 1250, 63.3), 120, {})
    dataState.instancesCount++
    expect(entity.center.x).toBe(10)
    expect(entity.center.y).toBe(1250)
    expect(entity.center.z).toBe(63.3)
  })

  it('should return the correct dxf string.', () => {
    const entity = new Circle(point3d(10, 1250, 63.3), 120, {})
    dataState.instancesCount++
    const handle = dataState.instancesCount.toString(16).toUpperCase()
    let entityString = `0\nCIRCLE\n5\n${handle}\n100\nAcDbEntity\n8\n0\n100\nAcDbCircle\n`
    entityString += '10\n10\n20\n1250\n30\n63.3\n40\n120'
    const dx = new Dxfier()
    entity.dxfy(dx)
    expect(dx.stringify()).toBe(entityString)
  })
})
