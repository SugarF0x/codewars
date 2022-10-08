// 59ccf051dcc4050f7800008f

import { describe, expect, it } from 'vitest'

/**
 * :angry:
 */

function buddy(a: number, b: number) {
  return null
}

describe('buddy-pairs', () => {
  it.each<[[number, number], null | [number, number]]>([
    [[23, 4669], [48, 75]],
    [[4952, 6539], [5775, 6128]],
    [[381, 4318], [1050, 1925]],
    [[2382, 3679], null],
  ])('should find buddy pairs', (input, output) => {
    expect(buddy(...input)).toEqual(output)
  })
})
