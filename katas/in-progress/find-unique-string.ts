import { describe, expect, it } from "vitest"

export function findUniq(arr: string[]): string {
  const set = new Set<string>()
  let uniq = ''

  for (const item of arr) {
    const characters = item.toLowerCase().replaceAll(' ', '').split('')

    let isUniq = characters.some(char => !set.has(char))
    for (const character of characters) set.add(character)

    if (isUniq) uniq = item
  }

  return uniq
}

describe('find-unique-string', () => {
  it.each([
    [['Aa', 'aaa', 'aaaaa', 'BbBb', 'Aaaa', 'AaAaAa', 'a'], 'BbBb'],
    [['abc', 'acb', 'bac', 'foo', 'bca', 'cab', 'cba'], 'foo'],
    [['silvia', 'vasili', 'victor'], 'victor'],
    [['Tom Marvolo Riddle', 'I am Lord Voldemort', 'Harry Potter'], 'Harry Potter'],
    [['    ', 'a', ' '], 'a'],
  ])('%#', (input, output) => {
    expect(findUniq(input)).toEqual(output)
  })
})
