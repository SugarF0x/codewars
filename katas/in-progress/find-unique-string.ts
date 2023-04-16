import { describe, expect, it } from "vitest"

export function findUniq(arr: string[]): string {
  const signatures = new Set<string>()

  for (const item of arr) {
    const itemSignature = [...new Set(item.toLowerCase().replaceAll(' ', '').split('').sort())].join('')

    if (!signatures.size) {
      signatures.add(itemSignature)
      continue
    }

    if (signatures.has(itemSignature)) continue
    return item
  }

  return arr[0]
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
