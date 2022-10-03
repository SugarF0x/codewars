import { describe, expect, it } from 'vitest'

function maxSequence(array: number[]): number {
  return 0
}

describe('max-subarray-sum', () => {
  it('should find max subarray sum', () => {
    expect(maxSequence([-2, 1, -3, 4, -1, 2, 1, -5, 4])).toEqual(6)
  })
})
