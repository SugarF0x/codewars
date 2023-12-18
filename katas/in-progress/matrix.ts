import { describe, expect, it } from "vitest"
import { cloneDeep } from 'lodash-es'

type Itemize<T extends Record<string, unknown>> = {
  [key in keyof T]: T[key] | Item<T[key]>
}

type Deitemize<T> = T extends Item<infer A> ? A : {
  [key in keyof T]: T[key] extends Item<infer I> ? I : Deitemize<T[key]>
}

class Item<I = unknown> {
  variations: I[]

  constructor(variations: I[]) {
    this.variations = variations
  }
}

// TODO; add Matrix.match() which would be akin to the matcher i once did for the config reducer
//  also add Matrix.Condition(match: (value: unknown) => boolean) that would run agains passed value
//  we would want to check validity of via the Matrix.match()

export class ObjectMatrix<T extends Record<string, unknown>> {
  input: Record<string, unknown>

  constructor(input: Itemize<T>) {
    this.input = input
  }

  static Item = Item

  // eslint-disable-next-line complexity
  unpack(): Deitemize<T>[] {
    const input = Object.entries(this.flattenObject(this.input))
    const output: [string, unknown][][] = []

    for (const [path, value] of input) {
      if (!output.length) {
        if (!(value instanceof ObjectMatrix.Item)) output.push([[path, value]])
        else output.push(...value.variations.map(variation => [[path, variation] as [string, unknown]]))
        continue
      }

      if (value instanceof ObjectMatrix.Item) {
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

        continue
      }

      for (const item of output) {
        item.push([path, value])
      }
    }

    return output.map(entries => this.unflattenObject(Object.fromEntries(entries))) as unknown as Deitemize<T>[]
  }

  // eslint-disable-next-line complexity
  private flattenObject(value: Record<string, unknown>) {
    const toReturn: Record<string, unknown> = {}

    for (const i in value) {
      if (!(i in value)) continue

      if ((typeof value[i]) == 'object' && value[i] !== null && !(value[i] instanceof ObjectMatrix.Item)) {
        const flatObject = this.flattenObject(value[i] as Record<string, unknown>)

        for (const x in flatObject) {
          if (!(x in flatObject)) continue

          toReturn[i + '.' + x] = flatObject[x]
        }
      } else {
        toReturn[i] = value[i]
      }
    }

    return toReturn
  }

  private unflattenObject(value: Record<string, unknown>) {
    const result: Record<string, unknown> = {}

    for (const i in value) {
      const keys = i.split('.')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
