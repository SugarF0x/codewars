// 555b1890a75b930e63000023
import { describe, expect, it } from 'vitest'

function deserializeSet(set: Set<string>) {
  return Array.from(set, entry => entry.split(',').map(Number).sort().reverse()).sort().reverse()
}

function serializeArray(array: number[]) {
  return array.sort().join(',')
}

function getCombinations(input: number) {
  const results = new Set<string>()

  for (let i = 1; i <= input; i++) {
    deserializeSet(results).forEach(e => {
      for (let j = 0; j < e.length; j++) {
        const newArray = [...e]
        newArray[j]++
        results.add(serializeArray(newArray))
      }
      results.add(serializeArray([...e, 1]))
    })

    results.add(serializeArray([i]))
  }

  return deserializeSet(results).filter(e => e.reduce((acc, val) => acc + val) === input)
}

describe('numberCombos', () => {
  it.each<[number, number[][]]>([
    [
      1,
      [
        [1]
      ]
    ],
    [
      2,
      [
        [2],
        [1, 1]
      ]
    ],
    [
      3,
      [
        [3],
        [2, 1],
        [1, 1, 1]
      ]
    ],
    [
      4,
      [
        [4],
        [3, 1],
        [2, 2],
        [2, 1, 1],
        [1, 1, 1, 1]
      ]
    ],
    [
      5,
      [
        [5],
        [4, 1],
        [3, 2],
        [3, 1, 1],
        [2, 2, 1],
        [2, 1, 1, 1],
        [1, 1, 1, 1, 1]
      ]
    ],
    [
      6,
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
      ]
    ],
    [
      7,
      [
        [7],
        [6, 1],
        [5, 2],
        [5, 1, 1],
        [4, 3],
        [4, 2, 1],
        [4, 1, 1, 1],
        [3, 3, 1],
        [3, 2, 2],
        [3, 2, 1, 1],
        [3, 1, 1, 1, 1],
        [2, 2, 2, 1],
        [2, 2, 1, 1, 1],
        [2, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1]
      ]
    ]
  ])('should be gucci %d', (input, results) => {
    expect(getCombinations(input)).toMatchObject(results.map(e => e.sort().reverse()).sort().reverse())
  })
})
