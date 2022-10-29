import { describe, expect, it } from 'vitest'
import Handle from 'Internals/Handle'

describe('Handle class', () => {
  it('The peek() should return "1"', () => {
    const peek = Handle.peek()
    expect(peek).toBe('1')
  })

  it('The next() should return "1"', () => {
    const next = Handle.next()
    expect(next).toBe('1')
  })

  it('The peek() should return "2"', () => {
    expect(Handle.peek()).toBe('2')
  })

  it('Brute force', () => {
    for (let i = 2; i < 10000; i++) {
      if (i % 1000 === 0) {
        const peek = Handle.peek()
        expect(peek).toBe(i.toString(16).toUpperCase())
      }
      Handle.next()
    }
  })
})
