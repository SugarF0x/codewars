// 55e2adece53b4cdcb900006c

import { describe, it, expect } from "vitest"

function race(v1: number, v2: number, g: number): [number, number, number] | null {
  if (v1 >= v2) return null

  const [mps1, mps2] = [v1/3600, v2/3600]
  const dps = mps2 - mps1
  const time = g/dps

  const date = new Date(Math.floor(time * 1000) + 1000 * 60 * 60 * 0.0000005)
  return [date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()]
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
