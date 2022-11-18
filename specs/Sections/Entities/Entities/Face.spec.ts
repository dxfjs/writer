import { describe, expect, it } from 'vitest'

import { Dxfier } from 'Internals/Dxfier'
import { Face } from 'EntitiesSection/Entities/Face'
import { point3d } from 'Internals/Helpers'

describe('Face', () => {
  const dataState = {
    instancesCount: 0,
  }

  it('should return the point given.', () => {
    const entity = new Face(
      point3d(0, 0, 50),
      point3d(3, 0, 0),
      point3d(0, 2, 0),
      point3d(90, 0, 0),
      {}
    )
    dataState.instancesCount++
    expect(entity.firstCorner.x).toBe(0)
    expect(entity.firstCorner.y).toBe(0)
    expect(entity.firstCorner.z).toBe(50)

    expect(entity.secondCorner.x).toBe(3)
    expect(entity.secondCorner.y).toBe(0)
    expect(entity.secondCorner.z).toBe(0)

    expect(entity.thirdCorner.x).toBe(0)
    expect(entity.thirdCorner.y).toBe(2)
    expect(entity.thirdCorner.z).toBe(0)

    expect(entity.fourthCorner.x).toBe(90)
    expect(entity.fourthCorner.y).toBe(0)
    expect(entity.fourthCorner.z).toBe(0)
  })

  it('should return the correct dxf string.', () => {
    const entity = new Face(
      point3d(0, 0, 50),
      point3d(3, 0, 0),
      point3d(0, 2, 0),
      point3d(90, 0, 0),
      {}
    )
    dataState.instancesCount++
    const handle = dataState.instancesCount.toString(16).toUpperCase()
    let entityString = `0\n3DFACE\n5\n${handle}\n100\nAcDbEntity\n8\n0\n100\nAcDbFace\n`
    entityString += '10\n0\n20\n0\n30\n50\n11\n3\n21\n0\n31\n0\n'
    entityString += '12\n0\n22\n2\n32\n0\n13\n90\n23\n0\n33\n0\n70\n0'
    const dx = new Dxfier()
    entity.dxfy(dx)
    expect(dx.stringify()).toBe(entityString)
  })
})
