import { Descriptor } from "../../types"

export class LazyDescriptor implements Descriptor {
  private value: any

  constructor(private generator: any) {}

  resolve(fields: Array<string>) {
    if (this.value === undefined) {
      this.value = this.generator()
    }

    if (fields.length) {
      return fields.reduce((prev, next) => prev[next], this.value)
    }

    return this.value
  }
}
