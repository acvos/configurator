import { Descriptor } from "../../types"

export class ArrayDescriptor implements Descriptor {
  constructor(private content: Array<Descriptor>) {}

  resolve(fields: Array<string>, context: Descriptor) {
    if (fields.length > 0) {
      throw new Error(`Getting deep field (${fields.join(".")}) from arrays is not supported`)
    }

    return this.content.map(x => x.resolve([], context))
  }
}
