// 55e2adece53b4cdcb900006c

import { describe, it, expect } from "vitest"

function race(speedA: number, speedB: number, headstart: number): [number, number, number] | null {
  return null
}

describe('tortoise-racing', () => {
  it.each<[[number, number, number], [number, number, number]]>([
    [[720, 850, 70], [0, 32, 18]],
    [[80, 91, 37], [3, 21, 49]],
    [[80, 100, 40], [2, 0, 0]],
    [[720, 850, 37], [0, 17, 4]],
  ])('should return catchup time %#', (input, output) => {
    expect(race(...input)).toMatchObject(output)
  })
})
