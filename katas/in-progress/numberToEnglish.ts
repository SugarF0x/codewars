import { describe, it, expect } from "vitest"

export function numberToEnglish(x: number): string {
  return "zero"; //your code here
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
    [99999, 'ninety nine thousand nine hundred ninety nin'],
  ])("Should return a string", (input, output) => {
    expect(numberToEnglish(input)).toEqual(output);
  });
});
