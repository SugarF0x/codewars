import { describe, expect, it } from "vitest"

export function findUniq(arr: string[]): string {
  const signatureItemsMap = new Map<string, string[]>()

  for (const itemKey in arr) {
    const itemIndex = Number(itemKey)
    const item = arr[itemIndex]
    const itemSignature = [...new Set(item.toLowerCase().replaceAll(' ', '').split('').sort())].join('')

    const currentSignatureItems = signatureItemsMap.get(itemSignature)
    if (!currentSignatureItems) signatureItemsMap.set(itemSignature, [item])
    else currentSignatureItems.push(item)

    if (signatureItemsMap.size === 2 && itemIndex > 1) return [...signatureItemsMap.entries()].sort((a, b) => a[1].length - b[1].length)[0][1][0]
  }

  throw new Error('No uniq found')
}

describe('find-unique-string', () => {
  it.each([
    [['Aa', 'aaa', 'aaaaa', 'BbBb', 'Aaaa', 'AaAaAa', 'a'], 'BbBb'],
    [['abc', 'acb', 'bac', 'foo', 'bca', 'cab', 'cba'], 'foo'],
    [['silvia', 'vasili', 'victor'], 'victor'],
    [['Tom Marvolo Riddle', 'I am Lord Voldemort', 'Harry Potter'], 'Harry Potter'],
    [['    ', 'a', ' '], 'a'],
    [[ 'o', 'b', 'b', 'b' ], 'o'],
    [Array(10000).fill('Gollum').concat('shit'), 'shit']
  ])('%#', (input, output) => {
    expect(findUniq(input)).toEqual(output)
  })
})
