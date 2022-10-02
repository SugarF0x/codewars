// 55e2adece53b4cdcb900006c

import { describe, it, expect } from "vitest"

function race(speedA: number, speedB: number, headstart: number): [number, number, number] | null {
  return null
}

describe('tortoise-racing', () => {
  it.each<[[number, number, number], [number, number, number]]>([])('should return catchup time %#', (input, output) => {
    expect(race(...input)).toMatchObject(output)
  })
})
