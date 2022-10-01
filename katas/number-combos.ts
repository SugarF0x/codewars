// 555b1890a75b930e63000023
import { describe, expect, it } from 'vitest'

function fillFirstLevel(num: number, base: number) {
  const results = [base]

  while (results.reduce((acc, val) => acc + val) < num) {
    const total = results.reduce((acc, val) => acc + val)
    if (total + base <= num) results.push(base)
    else results.push(num - base)
  }

  return results
}

function getBreakableIndexes(nums: number[]) {
  const numsToParse = nums.slice(1).reverse()
  const indexes = []

  for (const [index, num] of numsToParse.entries()) {
    if (num > 0) indexes.push(nums.length - 1 - index)
  }

  return indexes
}

function getCombinations(num: number): number[][] {
  const results = []

  for (let i = num; i > 0; i--) {
    let level = fillFirstLevel(num, i)
    results.push(level)

    const breakableIndexes = getBreakableIndexes(level)
    const recordedBreakResults: number[] = []
    for (const breakableIndex of breakableIndexes) {
      const breakResults = getCombinations(level[breakableIndex]).slice(1)
      results.push(...breakResults.map(e => [...level.slice(0, breakableIndex), ...e, ...recordedBreakResults]).map(e => e.flatMap(a => a)))
      recordedBreakResults.push(...breakResults)
    }
  }

  return results
}

describe('numberCombos', () => {
  it.each<number[][]>([
    [
      [1]
    ],
    [
      [2],
      [1, 1]
    ],
    [
      [3],
      [2, 1],
      [1, 1, 1]
    ],
    [
      [4],
      [3, 1],
      [2, 2],
      [2, 1, 1],
      [1, 1, 1, 1]
    ],
    [
      [5],
      [4, 1],
      [3, 2],
      [3, 1, 1],
      [2, 2, 1],
      [2, 1, 1, 1],
      [1, 1, 1, 1, 1]
    ],
    [
      [6],
      [5, 1],
      [4, 2],
      [4, 1, 1],
      [3, 3],
      [3, 2, 1],
      [3, 1, 1, 1],
      [2, 2, 2],
      [2, 2, 1, 1],
      [2, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1]
    ],
    [
      [7],
      [6, 1],
      [5, 2],
      [5, 1, 1],
      [4, 3],
      [4, 2, 1],
      [4, 1, 1, 1],
      [3, 3, 1],
      [3, 2, 1, 1],
      [3, 1, 1, 1, 1],
      [2, 2, 2, 1],
      [2, 2, 1, 1, 1],
      [2, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1]
    ]
  ])('should be gucci', (results) => {
    expect(getCombinations(results[0][0])).toMatchObject(results)
  })
})
