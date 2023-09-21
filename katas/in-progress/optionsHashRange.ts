export default class OptionsHashRange {
  entries: Record<string, unknown>[] = []

  getHashSet() {
    return new Set(this.entries.map(this.hashObject))
  }

  private hash(val: string) {
    if (val.length === 0) return 0

    let hash = 0

    for (const char of val.split('')) {
      const charCode = char.charCodeAt(0)
      hash = ((hash << 5) - hash) + charCode
      hash |= 0
    }

    return hash
  }

  private hashMerge(...args: string[]): number {
    return args.reduce((acc, val) => {
      if (acc === null) return this.hash(val)
      return acc ^ this.hash(val)
    }, null as unknown as number)
  }

  private flattenObject(value: Record<string, unknown>, excludeArrays = false) {
    const toReturn: Record<string, unknown> = {}

    for (let i in value) {
      if (!value.hasOwnProperty(i)) continue

      if ((typeof value[i]) == 'object' && value[i] !== null && (excludeArrays ? !Array.isArray(value[i]) : true)) {
        const flatObject = this.flattenObject(value[i] as Record<string, unknown>, excludeArrays)

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

  private sortObject<T extends Record<string, unknown>>(value: T): T {
    return Object.keys(value).sort().reduce<T>((acc, key) => {
      acc[key as keyof T] = value[key] as T[keyof T]
      return acc
    }, {} as T)
  }

  private hashObject(val: Record<string, unknown>): number {
    const flatObject = this.flattenObject(val)
    const sortedObject = this.sortObject(flatObject)
    const objectPairs = Object.entries(sortedObject).map(entry => entry.join(':'))

    return this.hashMerge(...objectPairs)
  }
}
