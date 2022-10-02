// 525f4206b73515bffb000b21

import { describe, it, expect } from "vitest"

function add(a: string, b: string): string {
  return a + b
}

describe('add-big-numbers', () => {
  it.each<[[string, string], string]>([
    [["1", "1"], "2"],
    [["123", "456"], "579"],
    [["888", "222"], "1110"],
    [["1372", "69"], "1441"],
    [["12", "456"], "468"],
    [["101", "100"], "201"],
    [['63829983432984289347293874', '90938498237058927340892374089'], "91002328220491911630239667963"],
  ])('should add properly %#', (input, output) => {
    expect(...input).toEqual(output)
  })
})
