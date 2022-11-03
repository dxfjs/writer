import { describe, expect, it } from 'vitest'

import { Spline } from 'EntitiesSection/Entities/Spline'
import { point3d } from 'Internals/Helpers'

describe('Spline', () => {
  const dataState = {
    instancesCount: 0,
  }
  it('should return the subClassName given.', () => {
    const points = [
      point3d(0, 0, 0),
      point3d(0, 10, 0),
      point3d(15, 15, 0),
      point3d(30, 10, 0),
      point3d(30, 0, 0),
    ]
    const entity = new Spline({ controlPoints: points }, {})
    dataState.instancesCount++
    expect(entity.controlPoints.length).toBe(5)
  })
})
