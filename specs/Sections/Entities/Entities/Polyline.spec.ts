import { describe, expect, it } from 'vitest'

import { Polyline } from 'EntitiesSection/Entities/Polyline'
import { point3d } from 'Internals/Helpers'

describe('Polyline3D', () => {
  it('should return the given parameters.', () => {
    const entity = new Polyline([
      { point: point3d(121.326, 0.4152, 8787) },
      { point: point3d(120, 5544, 45) },
    ])
    expect(entity.vertices.length).toBe(2)
  })
})
