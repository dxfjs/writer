import { describe, expect, it } from 'vitest'

import DxfClassesSection from 'ClassesSection/DxfClassesSection'
import { Dxfier } from 'Internals/Dxfier'

describe('Classes', () => {
  describe('stringify', () => {
    it('should return an empty CLASSES section.', () => {
      const classes = new DxfClassesSection()
      const dx = new Dxfier()
      classes.dxfy(dx)
      expect(dx.stringify()).toBe('0\nSECTION\n2\nCLASSES\n0\nENDSEC')
    })
  })
})
