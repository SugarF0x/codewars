import { describe, expect, it } from "vitest"

export function findUniq(arr: string[]): string {
  // Do the magic
  return arr[0];
}

describe('find-unique-string', () => {
  it.each([
    [['Aa', 'aaa', 'aaaaa', 'BbBb', 'Aaaa', 'AaAaAa', 'a'], 'BbBb'],
    [['abc', 'acb', 'bac', 'foo', 'bca', 'cab', 'cba'], 'foo'],
    [['silvia', 'vasili', 'victor'], 'victor'],
    [['Tom Marvolo Riddle', 'I am Lord Voldemort', 'Harry Potter'], 'Harry Potter'],
    [['    ', 'a', ' '], 'a'],
  ])('should ', (input, output) => {
    expect(findUniq(input)).toEqual(output)
  })
})
