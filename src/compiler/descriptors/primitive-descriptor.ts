import { Descriptor } from "../../types"

export class PrimitiveDescriptor implements Descriptor {
  constructor(private value: any) {}

  resolve(fields: Array<string>) {
    if (fields.length > 0) {
      throw new Error(`Getting deep field (${fields.join(".")}) from primitives is not supported`)
    }

    return this.value
  }
}
