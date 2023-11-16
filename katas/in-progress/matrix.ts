import { describe, expect, it } from "vitest"
import { cloneDeep } from 'lodash-es'

export class ObjectMatrix {
  input: Record<string, unknown>

  constructor(input: Record<string, unknown>) {
    this.input = input
  }

  static Item = class Item<T = unknown> {
    variations: T[]

    constructor(variations: T[]) {
      this.variations = variations
    }
  }

  unpack() {
    // TODO: recursively unpack all items
    const input = Object.entries(this.flattenObject(this.input))
    const output: [string, unknown][][] = []

    for (const [path, value] of input) {
      if (!output.length) {
        if (!(value instanceof ObjectMatrix.Item)) output.push([[path, value]])
        else output.push(...value.variations.map(variation => [[path, variation] as [string, unknown]]))
        continue
      }

      if (!(value instanceof ObjectMatrix.Item)) {
        for (const item of output) {
          item.push([path, value])
        }
      } else {
        const snapshot = cloneDeep(output)
        value.variations.forEach((variation, index) => {
          if (!index) {
            for (const item of output) {
              item.push([path, variation])
            }
          } else {
            output.push(...snapshot.map(item => [
              ...item,
              [path, variation] as [string, unknown]
            ]))
          }
        })
      }
    }

    return output.map(entries => this.unflattenObject(Object.fromEntries(entries)))
  }

  private flattenObject(value: Record<string, unknown>) {
    const toReturn: Record<string, unknown> = {}

    for (let i in value) {
      if (!value.hasOwnProperty(i)) continue

      if ((typeof value[i]) == 'object' && value[i] !== null && !(value[i] instanceof ObjectMatrix.Item)) {
        const flatObject = this.flattenObject(value[i] as Record<string, unknown>)

        for (let x in flatObject) {
          if (!flatObject.hasOwnProperty(x)) continue

          toReturn[i + '.' + x] = flatObject[x];
        }
      } else {
        toReturn[i] = value[i]
      }
    }

    return toReturn
  }

  private unflattenObject(value: Record<string, unknown>) {
    const result: Record<string, unknown> = {}

    for (let i in value) {
      const keys = i.split('.')
      keys.reduce<any>((r, e, j) => {
        return r[e] || (r[e] = isNaN(Number(keys[j + 1])) ? (keys.length - 1 == j ? value[i] : {}) : [])
      }, result)
    }

    return result
  }
}

//

describe("ObjectMatrix", () => {
  it("should", () => {
    const matrix = new ObjectMatrix({
      someVariantValue: new ObjectMatrix.Item([0, 2, 4, 8, 16, 32]),
      someStaticValue: 'i-am-static',
      someNestedObject: {
        withSomeStaticValue: 'i-am-also-static',
        withSomeVariantValue: new ObjectMatrix.Item(['single-value-variant']),
        withSomeMultipleVariantValue: new ObjectMatrix.Item(['one-value-variant', 'two-value-variant']),
      },
      someNestedArray: [
        new ObjectMatrix.Item(['i-can-change', 'i-am-uppredictible']),
        'static-array-item'
      ]
    })

    const data = matrix.unpack()

    expect(1).toBe(1)
  })
})
