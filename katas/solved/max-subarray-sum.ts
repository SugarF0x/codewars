import { describe, expect, it } from 'vitest'

function maxSequence(digits: number[]): number {
  let stack = []
  let stackSum = 0

  let maxStack = []
  let maxStackSum = 0

  for (let i = 0; i < digits.length; i++) {
    stack = []
    stackSum = 0

    for (const digit of digits.slice(i)) {
      stack.push(digit)
      stackSum += digit
      if (maxStackSum < stackSum) {
        maxStack = [...stack]
        maxStackSum = stackSum
      }
    }
  }

  return maxStackSum
}

describe('max-subarray-sum', () => {
  it('should find max subarray sum', () => {
    expect(maxSequence([-2, 1, -3, 4, -1, 2, 1, -5, 4])).toEqual(6)
  })
})
