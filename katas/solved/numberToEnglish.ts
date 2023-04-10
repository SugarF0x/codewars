import { describe, it, expect } from "vitest"

const digitToWordMap: Record<number, string> = {
  0: 'zero',
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
  7: 'seven',
  8: 'eight',
  9: 'nine',
  10: 'ten',
  11: 'eleven',
  12: 'twelve',
  13: 'thirteen',
  14: 'fourteen',
  15: 'fifteen',
  16: 'sixteen',
  17: 'seventeen',
  18: 'eighteen',
  19: 'nineteen',
  20: 'twenty',
  30: 'thirty',
  40: 'forty',
  50: 'fifty',
  60: 'sixty',
  70: 'seventy',
  80: 'eighty',
  90: 'ninety',
  100: 'hundred',
  1000: 'thousand'
}

function splitByThousands(value: number): [number, number] {
  const reverse = String(value).split('').reverse()
  return [reverse.slice(0, 3), reverse.slice(3, 6)].map<number>(e => Number(e.reverse().join(''))).reverse() as [number, number]
}

function extractBases(value: number): [number, number, number] {
  const stringValue = String(value).padStart(3, '0')
  return stringValue.split('').map((item, index) => Number(item.padEnd(3 - index, '0'))) as [number, number, number]
}

function basesToLocales(values: [number, number, number]): string {
  const [hundred, deca, single] = values
  let [localeHundred, localeDeca, localeSingle] = ''

  if (hundred !== 0) localeHundred = `${digitToWordMap[hundred / 100]} ${digitToWordMap[100]}`
  if (deca !== 0) localeDeca = `${digitToWordMap[deca === 10 ? deca + single : deca]}`
  if (single !== 0 && deca !== 10) localeSingle = `${digitToWordMap[single]}`

  return [localeHundred, localeDeca, localeSingle].filter(Boolean).join(' ')
}

export function numberToEnglish(x: number): string {
  if (x === 0) return digitToWordMap[0]

  const split = splitByThousands(x)
  const [thousands, singles] = split.map(extractBases).map(basesToLocales)

  return [thousands, singles].filter(Boolean).join(` ${digitToWordMap[1000]} `)
}


describe("Sample Test Cases", function(){
  it.each([
    [0, 'zero'],
    [7, 'seven'],
    [11, 'eleven'],
    [20, 'twenty'],
    [47, 'forty seven'],
    [100, 'one hundred'],
    [305, 'three hundred five'],
    [4002, 'four thousand two'],
    [3892, 'three thousand eight hundred ninety two'],
    [6800, 'six thousand eight hundred'],
    [14111, 'fourteen thousand one hundred eleven'],
    [20005, 'twenty thousand five'],
    [99999, 'ninety nine thousand nine hundred ninety nine'],
  ])("Should return a string", (input, output) => {
    expect(numberToEnglish(input)).toEqual(output);
  });
});
