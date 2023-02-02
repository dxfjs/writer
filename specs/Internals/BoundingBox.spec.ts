import { BoundingBox, createBoundingBox } from 'Internals/BoundingBox'
import { describe, expect, it } from 'vitest'

import { point3d } from 'Internals/Helpers'

describe('BoundingBox file', () => {

  describe('createBoundingBox function', () => {
    it('should create a bounding box object', () => {
      const bbox = createBoundingBox(point3d(0, 50), point3d(50, 0))
      expect(bbox).toEqual({
        tl: { x: 0, y: 50, z: 0 },
        br: { x: 50, y: 0, z: 0 },
      })
    })
  })

  describe('BoundingBox class', () => {
    it('should create a bounding box of a line', () => {
      BoundingBox.boundingBox([]) // for coverage
      const fp = point3d(0, 0)
      const sp = point3d(50, 50)
      const fbbox = BoundingBox.lineBBox(fp, sp)
      const sbbox = BoundingBox.lineBBox(sp, fp)
      expect(fbbox).toEqual({
        tl: { x: 0, y: 50, z: 0 },
        br: { x: 50, y: 0, z: 0 },
      })
      expect(sbbox).toEqual({
        tl: { x: 0, y: 50, z: 0 },
        br: { x: 50, y: 0, z: 0 },
      })
    })
  })
})
